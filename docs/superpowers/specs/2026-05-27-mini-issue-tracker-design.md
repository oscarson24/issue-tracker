# Mini Issue Tracker — Design Spec

**Date:** 2026-05-27  
**Scope:** Full-stack 6-hour test project

---

## Objective

A simple issue tracking system where users can view issues, add new ones, and mark them resolved. Includes status filtering and timestamps.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | ASP.NET Core Web API (C#) |
| ORM | Entity Framework Core |
| Database | SQL Server 2022 |
| Dev environment | Docker Compose |

---

## Architecture

**Monorepo structure:**
```
mini-issue-tracker/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── vite.config.js
│   └── src/
└── backend/
    ├── Dockerfile
    └── IssueTracker.Api/
        ├── Controllers/
        ├── Services/
        ├── Repositories/
        ├── Models/
        ├── DTOs/
        ├── Data/
        └── Program.cs
```

**Docker Compose services:**

| Service | Image | Port | Notes |
|---|---|---|---|
| `db` | `mcr.microsoft.com/mssql/server:2022-latest` | 1433 | SA password via env var |
| `backend` | custom Dockerfile | 5000 | Runs EF migrations on startup |
| `frontend` | custom Dockerfile | 3000 | Vite dev server; `/api/*` proxied to backend |

**Request flow:**
```
Browser :3000 → Vite proxy → backend:5000/api → Service → Repository → EF Core → SQL Server
```

No CORS configuration needed in development — the Vite proxy handles cross-origin requests. Swagger UI available at `http://localhost:5000/swagger`.

---

## Data Model

**`Issue` entity:**

```csharp
public class Issue
{
    public int Id { get; set; }
    public string Title { get; set; }         // required, max 200 chars
    public string Description { get; set; }   // required, max 2000 chars
    public IssueStatus Status { get; set; }   // enum: Open = 0, Resolved = 1
    public DateTime CreatedAt { get; set; }   // UTC, set on creation
    public DateTime? ResolvedAt { get; set; } // UTC, set when resolved
}
```

**`IssueStatus` enum:**
```csharp
public enum IssueStatus { Open = 0, Resolved = 1 }
```

---

## Backend Layer Design

| Layer | Class | Responsibility |
|---|---|---|
| Controller | `IssuesController` | HTTP in/out, input validation, 404/400 responses |
| Service | `IssueService` | Business logic: set `ResolvedAt`, prevent re-resolving |
| Repository | `IssueRepository` | EF queries, status filtering |
| DTOs | `CreateIssueDto`, `IssueDto` | Shape of data crossing the HTTP boundary |

**`CreateIssueDto`:** `{ title: string, description: string }`  
**`IssueDto`:** `{ id, title, description, status, createdAt, resolvedAt }`

---

## API Endpoints

| Method | Route | Description | Request body | Response |
|---|---|---|---|---|
| `GET` | `/api/issues` | List all issues | — | `IssueDto[]` |
| `GET` | `/api/issues?status=open` | Filter by status (`open` or `resolved`) | — | `IssueDto[]` |
| `POST` | `/api/issues` | Create a new issue | `CreateIssueDto` | `IssueDto` (201) |
| `PATCH` | `/api/issues/{id}/resolve` | Mark issue resolved | — | `IssueDto` (200) or 404 |

Edit and delete are out of scope.

---

## Frontend Design

**Component tree:**
```
App
├── FilterBar          ← "All / Open / Resolved" toggle buttons
├── IssueList
│   └── IssueCard[]   ← title, description, status badge, timestamps, resolve button
└── IssueForm          ← title + description inputs, submit button
```

**Component responsibilities:**

| Component | Props | Behavior |
|---|---|---|
| `FilterBar` | `filter`, `onChange` | 3 buttons; active filter highlighted |
| `IssueList` | `issues`, `onResolve` | Maps issues → IssueCard; shows empty state message |
| `IssueCard` | `issue`, `onResolve` | Badge: green = Resolved, yellow = Open; resolve button hidden when already resolved |
| `IssueForm` | `onSubmit` | Controlled inputs; clears fields on successful submit |

**State:** All state lives in `App` — issues array + active filter via `useState`. No external state library.

**`src/services/issueService.js`:**

| Function | HTTP call |
|---|---|
| `getIssues(filter)` | `GET /api/issues?status=filter` |
| `createIssue(data)` | `POST /api/issues` |
| `resolveIssue(id)` | `PATCH /api/issues/{id}/resolve` |

**Data flow:** `App` re-fetches the full list from the API after every mutation (create, resolve). Keeps state simple and always consistent with the server.

---

## Out of Scope

- Authentication / authorization
- Edit issue
- Delete issue
- Pagination
- Unit tests (not required in the 6-hour window)
