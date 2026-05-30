using IssueTracker.Api.Data;
using IssueTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTracker.Api.Repositories;

public class IssueRepository : IIssueRepository
{
    private readonly AppDbContext _context;

    public IssueRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Issue>> GetAllAsync(string? status)
    {
        var query = _context.Issues.AsQueryable();

        if (status == "open")
            query = query.Where(i => i.Status == IssueStatus.Open);
        else if (status == "resolved")
            query = query.Where(i => i.Status == IssueStatus.Resolved);

        return await query.OrderByDescending(i => i.CreatedAt).ToListAsync();
    }

    public async Task<Issue?> GetByIdAsync(int id) =>
        await _context.Issues.FindAsync(id);

    public async Task<Issue> CreateAsync(Issue issue)
    {
        _context.Issues.Add(issue);
        await _context.SaveChangesAsync();
        return issue;
    }

    public async Task<Issue> UpdateAsync(Issue issue)
    {
        await _context.SaveChangesAsync();
        return issue;
    }
}
