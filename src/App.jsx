import { useEffect, useState } from 'react'
import './App.css'

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' },
]

const formatTime = (totalSeconds) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function App() {
  const [query, setQuery] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [visibleUsers, setVisibleUsers] = useState(USERS)

  useEffect(() => {
    const searchTimerId = setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase()

      setVisibleUsers(
        USERS.filter(({ name, role }) =>
          `${name} ${role}`.toLowerCase().includes(normalizedQuery),
        ),
      )
    }, 300)

    return () => clearTimeout(searchTimerId)
  }, [query])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    document.title = `${visibleUsers.length} visible results`
  }, [visibleUsers.length])

  return (
    <main className="exam-shell">
      <section className="prompt-card">
        <h1>Live Search and Timer</h1>

        <div className="meta-grid" aria-label="Exam metadata">
          <div className="meta-row">
            <span className="meta-label"></span>
            <span className="meta-value"></span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Time</span>
            <span className="meta-value">45 minutes</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Points</span>
            <span className="meta-value">20</span>
          </div>

        </div>

        <div className="prompt-section">
          <h2>Starter Data</h2>
          <pre>
              id: 1, name: 'Ana Cruz', role: 'Developer'
              id: 2, name: 'Ben Lim', role: 'Designer',
              id: 3, name: 'Cara Yu', role: 'Tester',
              id: 4, name: 'Dan Go', role: 'Developer',
          </pre>
        </div>
      
</section>
      <section className="app-card" aria-label="Live search and timer">
        <div className="toolbar">
          <label className="search-box" htmlFor="user-search">
            <span>Search</span>
            <input
              id="user-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter users..."
            />
          </label>

          <div className="timer-box" aria-live="polite">
            <span>Session Timer</span>
            <strong>{formatTime(seconds)}</strong>
          </div>
        </div>

        <div className="result-summary">
          Showing <strong>{visibleUsers.length}</strong> visible user{visibleUsers.length === 1 ? '' : 's'}
        </div>

        <ul className="user-list">
          {visibleUsers.map((user) => (
            <li key={user.id} className="user-item">
              <div>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
              <span className="pill">#{user.id}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
