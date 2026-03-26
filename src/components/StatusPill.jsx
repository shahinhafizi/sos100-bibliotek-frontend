export function StatusPill({ status }) {
  const raw = String(status ?? '').trim();
  if (!raw) return null;

  const normalized = raw.toLowerCase();

  const label = raw;
  const variant =
    normalized === 'active' || normalized === 'ongoing' || normalized === 'open'
      ? 'active'
      : normalized === 'returned' || normalized === 'closed'
        ? 'returned'
        : 'neutral';

  return <span className={`status-pill ${variant}`}>{label}</span>;
}

