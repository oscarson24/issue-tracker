const BASE = '/api/issues'

export async function getIssues(filter, signal) {
    const url = filter ? `${BASE}?status=${filter}` : BASE
    const res = await fetch(url, signal ? { signal } : undefined)
    if (!res.ok) throw new Error('Failed to fetch issues')
    return res.json()
}

export async function createIssue({ title, description }) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    })
    if (!res.ok) throw new Error('Failed to create issue')
    return res.json()
}

export async function resolveIssue(id) {
    const res = await fetch(`${BASE}/${id}/resolve`, { method: 'PATCH' })
    if (!res.ok) throw new Error('Failed to resolve issue')
    return res.json()
}
