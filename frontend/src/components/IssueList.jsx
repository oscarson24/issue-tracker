import IssueCard from './IssueCard'

export default function IssueList({ issues, onResolve }) {
    if (issues.length === 0) {
        return (
            <p className="text-center text-gray-400 py-12">No issues found.</p>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} onResolve={onResolve} />
            ))}
        </div>
    )
}
