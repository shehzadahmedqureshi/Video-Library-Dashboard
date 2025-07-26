# Video Library Dashboard

This project is a full-stack Video Library Dashboard built as part of a technical challenge. The goal is to demonstrate thoughtful prioritization, clean code, and clear decision-making within a ~4 hour window.

---

## Tech Stack

- **Frontend:** Next.js (React, TypeScript), Tailwind CSS
- **Backend:** Python (FastAPI), Pydantic for schema validation
- **Testing:** Jest, React Testing Library (frontend); Pytest (backend)
- **Other:** RESTful API, modular folder structure

**Why these?**

- **Backend Choice:** I used Python with FastAPI for the backend because I’m currently more experienced with Python than with Node.js. This decision was based on a conversation with the recruiter, who confirmed with the internal team that my lack of Node.js experience was acceptable, and that I could learn it if selected for the role. Since I’m not yet familiar with Node.js, I chose FastAPI to focus on delivering clean and structured code within the limited time for this challenge.
- **Next.js/React/TypeScript:** Modern, scalable, and type-safe for rapid UI development.
- **FastAPI:** Fast, easy-to-use Python backend with built-in validation and async support.
- **Tailwind:** Quick, consistent styling.

---

## 🔧 Setup Instructions

### 1. Backend (Python/FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 🛠️ Setting Up PostgreSQL on Neon

Neon provides a free tier with generous limits — perfect for quick full-stack projects like this one.

1. Go to [Neon](https://neon.tech/) and sign up.
2. Create a new project.
3. Click on **"Connection Details"** → Copy the `postgresql://...` URL.
4. In your backend:

Create a `.env` file inside the backend directory and add your database URL:

```env
# .env
DATABASE_URL=your_neon_postgres_url_here
```

Seed the dataset and start the server:

```bash
python3 load_videos.py  # Seeds dataset from videos.json
uvicorn main:app --reload
```

- The API will be available at: [http://localhost:8000](http://localhost:8000)
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

- The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📘 Assumptions & Trade-offs

- **Backend:** Used Python/FastAPI for speed and familiarity.
- **Data:** Videos are loaded from `videos.json`. Data is persisted in a PostgreSQL database (hosted on Neon).
- **Validation:**
  - Backend: Pydantic schemas handle input validation and type enforcement, with minimal custom error messages.
  - Frontend: Form-level validation ensures required fields (e.g., title) are filled before submission.
- **Frontend:** Focused on clean, modular components and responsive design.
- **Testing:** Only a few representative tests included due to time constraints.
- **Accessibility:** Labeled inputs and basic ARIA attributes included.

**Database Hosting:** Chose Neon for PostgreSQL hosting due to its:

- Generous free tier
- Easy setup (no Docker or local Postgres needed)
- Serverless, developer-friendly experience

---

## 🚀 Future Improvements

**Backend:**

- Add pagination, search, filtering, and sorting via query parameters

**Frontend:**

- Search by title
- Filter by tags and date range
- View video details in a modal or on a separate page

**General:**

- More comprehensive test coverage (unit & integration)
- Improved error handling

❗ _These features were considered but left out due to time constraints, in favor of focusing on clean structure and core functionality._

---

## 📦 Challenge Features

### 🔹 Video List Page

- Responsive grid of videos
- Displays title, `created_at`, and tags
- Sort by date (newest/oldest)

### 🔹 Video Creation Page

- Title (required), tags (optional)
- `created_at` is auto-set by the backend
- Default values used for thumbnail, duration, and views

---

## API Documentation

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

### GET `/videos`

- Returns: List of video objects

### POST `/create-video`

- **Body:**

```json
{
  "title": "string", // required
  "tags": ["string"], // optional
  "thumbnail": "string", // optional
  "duration": 120, // optional, integer (seconds)
  "views": 1000 // optional, integer
}
```

- **Returns:** Created video object
- `created_at` is automatically set by the server

---

## 🧪 Testing

### Frontend (Jest + React Testing Library)

- Example tests:
  - `src/app/videos.test.tsx`
  - `src/app/create/CreateVideo.test.tsx`

To run frontend tests:

```bash
cd frontend
npm test
```

### Backend (Pytest)

- Example test file: `backend/test_main.py`

To run backend tests:

```bash
cd backend
source venv/bin/activate # if not already activated
pytest
```

> Ensure `.env` contains a valid `DATABASE_URL`.

---

## ⚠️ Known Gaps

- Minimal error handling
- Limited test coverage

---

## 💡 Notes

- Prioritized clean, modular code and user flow over feature completeness.

---

Thank you for reviewing!
