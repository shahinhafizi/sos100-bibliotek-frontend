import { StatusPill } from './StatusPill';

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

export function LoanCard({ loan }) {
  const bookLabel = loan.bookTitle ?? loan.title ?? loan.bookName ?? null;
  const bookId = loan.bookId ?? loan.bookID ?? null;
  const user = loan.userId ?? loan.userID ?? loan.username ?? null;
  // Status kommer antingen från backend (status) eller härleds från isReturned för att matcha datamodellen.
  const derivedStatus =
    loan.status ??
    (loan.isReturned === true
      ? 'Återlämnad'
      : loan.isReturned === false
        ? 'Utlånad'
        : null);

  return (
    <article className="loan-card">
      <header className="loan-card__header">
        <div>
          <div className="loan-card__kicker">Lån</div>
          <h3 className="loan-card__title">#{loan.id}</h3>
        </div>
        <StatusPill status={derivedStatus} />
      </header>

      <dl className="loan-card__meta">
        <div className="loan-card__row">
          <dt>Bok</dt>
          <dd>{bookLabel ?? (bookId != null ? `ID ${bookId}` : '—')}</dd>
        </div>
        {bookId != null && bookLabel != null ? (
          <div className="loan-card__row">
            <dt>Bok-ID</dt>
            <dd>{bookId}</dd>
          </div>
        ) : null}
        <div className="loan-card__row">
          <dt>Användare</dt>
          <dd>{user ?? '—'}</dd>
        </div>
        <div className="loan-card__row">
          <dt>Utlånad</dt>
          <dd>{formatDate(loan.loanDate)}</dd>
        </div>
      </dl>
    </article>
  );
}

