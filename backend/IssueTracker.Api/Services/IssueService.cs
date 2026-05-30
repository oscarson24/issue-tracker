using IssueTracker.Api.DTOs;
using IssueTracker.Api.Models;
using IssueTracker.Api.Repositories;

namespace IssueTracker.Api.Services;

public class IssueService : IIssueService
{
    private readonly IIssueRepository _repository;

    public IssueService(IIssueRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<IssueDto>> GetAllAsync(string? status)
    {
        var issues = await _repository.GetAllAsync(status);
        return issues.Select(ToDto);
    }

    public async Task<IssueDto> CreateAsync(CreateIssueDto dto)
    {
        var issue = new Issue
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = IssueStatus.Open,
            CreatedAt = DateTime.UtcNow
        };
        var created = await _repository.CreateAsync(issue);
        return ToDto(created);
    }

    public async Task<IssueDto?> ResolveAsync(int id)
    {
        var issue = await _repository.GetByIdAsync(id);
        if (issue is null) return null;
        if (issue.Status == IssueStatus.Resolved) return ToDto(issue);

        issue.Status = IssueStatus.Resolved;
        issue.ResolvedAt = DateTime.UtcNow;
        var updated = await _repository.UpdateAsync(issue);
        return ToDto(updated);
    }

    private static IssueDto ToDto(Issue issue) => new()
    {
        Id = issue.Id,
        Title = issue.Title,
        Description = issue.Description,
        Status = issue.Status.ToString(),
        CreatedAt = issue.CreatedAt,
        ResolvedAt = issue.ResolvedAt
    };
}
