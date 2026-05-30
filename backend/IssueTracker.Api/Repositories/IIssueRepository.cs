using IssueTracker.Api.Models;

namespace IssueTracker.Api.Repositories;

public interface IIssueRepository
{
    Task<IEnumerable<Issue>> GetAllAsync(string? status);
    Task<Issue?> GetByIdAsync(int id);
    Task<Issue> CreateAsync(Issue issue);
    Task<Issue> UpdateAsync(Issue issue);
}
