import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h2>Home</h2>

      <nav>
        <ul>
          <li>
            <Link to="/react">Home</Link>
          </li>
          <li>
            <Link to="/react/hooks">Hooks</Link>
          </li>
          <li>
            <Link to="/react/hooks-faq">Hooks-FAQ</Link>
          </li>
          <li>
            <Link to="/react/core">Core</Link>
          </li>
        </ul>
      </nav>

      <main className="main" style={{ border: `1px solid steelblue` }}>
        <Outlet />
      </main>
    </>
  )
}
