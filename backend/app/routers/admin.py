from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.ticket import Ticket
from app.models.enums import TicketStatus
from app.core.dependencies import admin_only

router = APIRouter(prefix="/admin")

@router.patch("/ticket/{ticket_id}")
async def update_ticket_status(
    ticket_id: int,
    status: TicketStatus,
    admin=Depends(admin_only),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one()
    ticket.status = status
    await db.commit()
    return ticket