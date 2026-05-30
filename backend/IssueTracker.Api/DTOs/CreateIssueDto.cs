using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Api.DTOs;

public class CreateIssueDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;
}
