export default function IssueCard({ issue, onResolve }) {
    const isResolved = issue.status === 'Resolved'

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base">{issue.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                        <span>Created: {new Date(issue.createdAt).toLocaleString()}</span>
                        {issue.resolvedAt && (
                            <span>Resolved: {new Date(issue.resolvedAt).toLocaleString()}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium ${isResolved
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                    >
                        {issue.status}
                    </span>
                    {!isResolved && (
                        <button
                            onClick={() => onResolve(issue.id)}
                            className="px-3 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                        >
                            Resolve
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
