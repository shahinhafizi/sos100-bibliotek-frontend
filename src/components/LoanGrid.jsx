import { LoanCard } from './LoanCard';

export function LoanGrid({ loans }) {
  if (!loans?.length) {
    return (
      <div className="empty-state">
        <h2>Inga lån att visa</h2>
        <p>API:et svarade med en tom lista.</p>
      </div>
    );
  }

  return (
    <section className="loan-grid" aria-label="Lista över lån">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </section>
  );
}

