import './App.css';
import { LoanGrid } from './components/LoanGrid';
import { TopBar } from './components/TopBar';
import { useLoans } from './hooks/useLoans';
import { API_BASE_URL } from './services/api';

function App() {
  const { loans, loading, error, refetch } = useLoans();

  return (
    <div className="page">
      <TopBar
        title="Bibliotekets lånesystem"
        subtitle="Visar lån från ditt lokala API (SPA i React)."
        onRefresh={refetch}
        apiBaseUrl={API_BASE_URL}
      />

      <main className="content">
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner" aria-hidden="true" />
            Hämtar lån från API…
          </div>
        ) : (
          <LoanGrid loans={loans} />
        )}
      </main>

      <footer className="footer">
        <span>Frontend: React + Vite</span>
        <span className="footer__dot" aria-hidden="true">
          ·
        </span>
        <span>Integration: GET /api/loan</span>
      </footer>
    </div>
  );
}

export default App;