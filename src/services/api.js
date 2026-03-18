import axios from 'axios';

// Här sätter vi bas-URL:en till din backend. 
// VIKTIGT: Se till att portnumret (t.ex. 7058) matchar det du ser i Rider!
const API_BASE_URL = 'https://localhost:7058/api';

export const getLoans = async () => {
    try {
        // Vi gör ett GET-anrop till /loan-endpointen
        const response = await axios.get(`${API_BASE_URL}/loan`);
        return response.data; // Returnerar listan på lån
    } catch (error) {
        console.error("Kunde inte hämta data från API:et:", error);
        throw error;
    }
};