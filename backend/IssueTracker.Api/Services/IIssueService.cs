using IssueTracker.Api.DTOs;

namespace IssueTracker.Api.Services;

public interface IIssueService
{
    Task<IEnumerable<IssueDto>> GetAllAsync(string? status);
    Task<IssueDto> CreateAsync(CreateIssueDto dto);
    Task<IssueDto?> ResolveAsync(int id);
}
