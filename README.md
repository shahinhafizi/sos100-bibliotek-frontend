# Sos100 Bibliotek – Frontend (React)

## Vad applikationen gör

Det här är en liten **SPA** i **React + Vite** som visar lån från vårt API.

På sidan:

- Jag hämtar lån från API:t och visar dem som kort i ett grid.
- Jag visar loading-state medan datan hämtas och ett felmeddelande om något går fel.
- Jag visar bok (titel) och om lånet är **Utlånad/Återlämnad** (baserat på `isReturned`).
  - Jag mappar `isReturned=true` → Återlämnad och `false` → Utlånad.

## Hur man kör applikationen (koppling mot API)

### Förutsättningar

- Node.js (LTS)

### Starta frontenden

```bash
      npm install   # installerar bibliotek
      npm run dev   # startar utvecklingsservern
```

Frontend kör på `http://localhost:5173`.

### API-koppling

Jag styr vilken backend som används med:

- `VITE_API_BASE_URL`

I detta projekt använder jag `/api` som standard lokalt, och Vite proxar det vidare till backend.

Skapa en `.env` i projektroten:

```env
VITE_API_BASE_URL=/api
```

Anropet som görs är:

- `GET {VITE_API_BASE_URL}/loan`

Om API:t kräver nyckel kan du även sätt:

```env
VITE_API_KEY=din_nyckel_här
```

Den skickas då automatiskt med som `X-Api-Key` i varje anrop (Axios-interceptor), vilket matchar säkerhetsfiltret i LoanAPI.

## AI-användning (kort)

Jag använde AI som stöd för att:

- få förslag på struktur (API-service + hook + komponenter)
- förbättra fel-/loading-hantering och README-upplägg

Sedan anpassade jag allt till mitt projekt (våra endpoints, mina fält som `bookTitle`/`isReturned`, och min styling).

## Övrigt

- **Axios** används för API-anrop.
