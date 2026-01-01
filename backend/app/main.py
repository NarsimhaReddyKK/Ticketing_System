from fastapi import FastAPI
from app.routers import auth, tickets, admin

app = FastAPI()

app.include_router(auth.router)
app.include_router(tickets.router)
app.include_router(admin.router)
