from pydantic import BaseModel
from app.models.enums import TicketStatus
from datetime import datetime

class TicketCreate(BaseModel):
    title: str
    description: str

class TicketUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    status: TicketStatus
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True
