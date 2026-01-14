# API Testing Tool (FastAPI + Next.js)

A full-stack API testing and monitoring platform built using FastAPI and Next.js.
The application allows developers to create, send, analyze, and track API requests
through a modern and intuitive web interface.

## Key Features

- **API Request Builder**
  - Create and send HTTP requests (GET, POST, PUT, DELETE, etc.)
  - Custom headers, query parameters, and request bodies

- **Authentication Handling**
  - Support for Bearer tokens, API keys, and custom auth headers

- **Response Analysis**
  - View formatted JSON responses
  - Inspect status codes, headers, and response times

- **Request History & Logs**
  - Store and review previously executed API requests
  - Useful for debugging and auditing API behavior

- **User Management**
  - Secure user registration and login
  - User-specific API testing workspaces

- **Monitoring (Planned)**
  - Scheduled health checks for APIs
  - Alerting for downtime or failed responses

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (TypeScript)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (or configurable)
- **Other**: JWT Authentication, REST APIs

## Project Structure

```
.
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── logs/
│   └── requirements.txt
├── frontend
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Open the frontend in your browser.
2. Register or log in.
3. Create API requests using the request builder.
4. Inspect responses and headers.
5. Review request history.

## Future Improvements

- Automated API monitoring
- Request collections and environments
- Team collaboration

## License

MIT License
