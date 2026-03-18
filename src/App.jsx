import { useEffect, useState } from 'react'
import { getLoans } from './services/api'
import './App.css'

function App() {
    // Här skapar vi "states" för att hålla koll på vår data och om det laddar
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect körs en gång när sidan laddas
    useEffect(() => {
        getLoans()
            .then(data => {
                setLoans(data);      // Sparar lånen i vår state
                setLoading(false);   // Säger till att vi har laddat klart
            })
            .catch(err => {
                setError("Kunde inte hämta lån. Starta Backend i Rider!");
                setLoading(false);
            })
    }, [])

    // Om sidan håller på att hämta data visar vi en enkel text
    if (loading) return <div className="loading">Hämtar lån från databasen...</div>

    return (
        <div className="container">
            <h1>📚 Bibliotekets Lånesystem</h1>

            {/* Om något gick fel visar vi felmeddelandet här */}
            {error && <div className="error-banner">{error}</div>}

            <div className="loan-grid">
                {/* Vi loopar igenom alla lån och skapar ett "kort" för varje */}
                {loans.map(loan => (
                    <div key={loan.id} className="loan-card">
                        <div className="card-header">
                            <h3>Lån #{loan.id}</h3>
                            <span className={`status-badge ${loan.status.toLowerCase()}`}>
                {loan.status}
              </span>
                        </div>
                        <div className="card-body">
                            <p><strong>Bok ID:</strong> {loan.bookId}</p>
                            <p><strong>Användare:</strong> {loan.userId}</p>
                            <p className="date">Utlånat: {new Date(loan.loanDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App