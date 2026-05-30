import { useState } from 'react'

export default function IssueForm({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (!title.trim() || !description.trim()) return
        setSubmitting(true)
        try {
            await onSubmit({ title: title.trim(), description: description.trim() })
            setTitle('')
            setDescription('')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6"
        >
            <h2 className="font-semibold text-gray-900 mb-3">New Issue</h2>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={200}
                    required
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={2000}
                    required
                    rows={3}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="self-end px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {submitting ? 'Adding…' : 'Add Issue'}
                </button>
            </div>
        </form>
    )
}
