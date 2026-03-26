import axios from 'axios';

// API-bas (styr via VITE_API_BASE_URL vid behov)
const AZURE_API_BASE_URL =
  'https://app-sos100-loanservice-dyg8gjf9csfpd6f5.norwayeast-01.azurewebsites.net/api';

// Dev: kör via proxy ("/api"). Prod: Azure som fallback.
const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : AZURE_API_BASE_URL;
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Axios-klient (timeout för att undvika "häng")
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Om API:t kräver nyckel kan jag slå på den via .env (VITE_API_KEY)
api.interceptors.request.use((config) => {
  if (!API_KEY) return config;
  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      'X-Api-Key': API_KEY,
    },
  };
});

// GET {baseURL}/loan
export async function getLoans() {
  const response = await api.get('/loan');
  return response.data;
}

export function formatApiError(err) {
  // Axios errors: https://axios-http.com/docs/handling_errors
  if (!err) return 'Okänt fel.';

  // Request never reached server (CORS, DNS, cert, backend down, etc.)
  if (err.code === 'ERR_NETWORK') {
    return 'Nätverksfel. Kontrollera att backend kör och att URL/proxy är korrekt (lokalt https-cert kan också orsaka detta).';
  }

  const status = err.response?.status;
  if (typeof status === 'number') {
    const hint =
      status === 404
        ? 'Endpoint hittades inte (kontrollera route /api/loan).'
        : status === 401 || status === 403
          ? 'Åtkomst nekad (auth/behörighet).'
          : status >= 500
            ? 'Serverfel i backend.'
            : 'Felaktigt svar från backend.';
    return `API-fel (${status}). ${hint}`;
  }

  return err.message ? `Fel: ${err.message}` : 'Okänt fel.';
}