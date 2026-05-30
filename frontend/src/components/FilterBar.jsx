export default function FilterBar({ filter, onChange }) {
    const buttons = [
        { label: 'All', value: '' },
        { label: 'Open', value: 'open' },
        { label: 'Resolved', value: 'resolved' },
    ]

    return (
        <div className="flex gap-2 mb-4">
            {buttons.map(({ label, value }) => (
                <button
                    key={value}
                    onClick={() => onChange(value)}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${filter === value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
