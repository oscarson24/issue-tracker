import { useState, useEffect, useCallback } from 'react'
import FilterBar from './components/FilterBar'
import IssueForm from './components/IssueForm'
import IssueList from './components/IssueList'
import { getIssues, createIssue, resolveIssue } from './services/issueService'

export default function App() {
    const [issues, setIssues] = useState([])
    const [filter, setFilter] = useState('')
    const [error, setError] = useState(null)

    const fetchIssues = useCallback(async (signal) => {
        try {
            const data = await getIssues(filter, signal)
            setIssues(data)
            setError(null)
        } catch (err) {
            if (err.name !== 'AbortError') setError('Failed to load issues.')
        }
    }, [filter])

    useEffect(() => {
        const controller = new AbortController()
        fetchIssues(controller.signal)
        return () => controller.abort()
    }, [fetchIssues])

    async function handleCreate(data) {
        try {
            await createIssue(data)
            await fetchIssues()
        } catch {
            setError('Failed to create issue.')
        }
    }

    async function handleResolve(id) {
        try {
            await resolveIssue(id)
            await fetchIssues()
        } catch {
            setError('Failed to resolve issue.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Issue Tracker</h1>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <IssueForm onSubmit={handleCreate} />
                <FilterBar filter={filter} onChange={setFilter} />
                <IssueList issues={issues} onResolve={handleResolve} />
            </div>
        </div>
    )
}
