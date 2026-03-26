export function TopBar({ title, subtitle, onRefresh, apiBaseUrl }) {
  return (
    <div className="topbar">
      <div className="topbar__titles">
        <h1 className="topbar__title">{title}</h1>
        <p className="topbar__subtitle">
          {subtitle}{' '}
          <span className="topbar__meta">
            API: <code>{apiBaseUrl}</code>
          </span>
        </p>
      </div>
      <div className="topbar__actions">
        <button className="button" type="button" onClick={onRefresh}>
          Uppdatera
        </button>
      </div>
    </div>
  );
}

