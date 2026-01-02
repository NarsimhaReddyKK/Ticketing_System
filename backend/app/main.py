from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, tickets, admin

app = FastAPI()

# -----------------------------
# ✅ CORS Middleware
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React (Vite dev server)
    allow_credentials=True,                   # Required for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ✅ Routers
# -----------------------------
# auth router already has prefix="/auth" inside auth.py
app.include_router(auth.router)

# tickets router already has prefix="/tickets" inside tickets.py
app.include_router(tickets.router)

# admin router, add prefix here if not set inside admin.py
app.include_router(admin.router)
