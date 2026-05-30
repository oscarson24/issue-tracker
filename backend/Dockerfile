FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY IssueTracker.Api/IssueTracker.Api.csproj IssueTracker.Api/
RUN dotnet restore IssueTracker.Api/IssueTracker.Api.csproj
COPY . .
RUN dotnet publish IssueTracker.Api/IssueTracker.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "IssueTracker.Api.dll"]
