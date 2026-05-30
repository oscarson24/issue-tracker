using IssueTracker.Api.DTOs;
using IssueTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace IssueTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IssuesController : ControllerBase
{
    private readonly IIssueService _service;

    public IssuesController(IIssueService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status)
    {
        var normalized = status?.ToLowerInvariant();
        if (normalized is not null && normalized is not "open" and not "resolved")
            return BadRequest("status must be 'open' or 'resolved'.");
        var issues = await _service.GetAllAsync(normalized);
        return Ok(issues);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateIssueDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);
        return Created(string.Empty, created);
    }

    [HttpPatch("{id}/resolve")]
    public async Task<IActionResult> Resolve(int id)
    {
        var issue = await _service.ResolveAsync(id);
        if (issue is null) return NotFound();
        return Ok(issue);
    }
}
