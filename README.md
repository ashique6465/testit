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

.
├── backend
│ ├── app
│ │ ├── main.py # FastAPI application entry point
│ │ ├── routers/ # API routes
│ │ ├── models/ # Pydantic schemas
│ │ ├── services/ # Business logic layer
│ │ └── utils/ # Shared utilities
│ ├── logs/ # Application logs
│ └── requirements.txt # Python dependencies
├── frontend
│ ├── app/ # Next.js app directory
│ ├── components/ # Reusable UI components
│ ├── services/ # API service layer
│ ├── public/ # Static assets
│ ├── package.json
│ └── tsconfig.json
└── README.md

bash
Copy code

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Backend runs at: http://localhost:8000

Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:3000

Usage
Open the frontend in your browser.

Register or log in.

Create API requests using the request builder.

Inspect responses, headers, and response times.

Review request history for debugging and analysis.

Future Improvements
Automated API monitoring and alerts

Request collections and environments

Export/import API configurations

Team collaboration features
