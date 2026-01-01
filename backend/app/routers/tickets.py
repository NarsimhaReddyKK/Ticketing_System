from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate, TicketResponse
from app.models.enums import TicketStatus
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("/", response_model=TicketResponse)
async def create_ticket(
    data: TicketCreate,
    user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    ticket = Ticket(
        title=data.title,
        description=data.description,
        owner_id=user.id
    )
    db.add(ticket)
    await db.commit()
    await db.refresh(ticket)
    return ticket

@router.put("/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: int,
    data: TicketUpdate,
    user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()

    if not ticket:
        raise HTTPException(404, "Ticket not found")

    if ticket.owner_id != user.id and user.role != "admin":
        raise HTTPException(403, "Not allowed")

    if data.title:
        ticket.title = data.title
    if data.description:
        ticket.description = data.description

    await db.commit()
    await db.refresh(ticket)
    return ticket

@router.get("/status/{status}", response_model=list[TicketResponse])
async def filter_tickets(
    status: TicketStatus,
    user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Ticket).where(Ticket.status == status)

    if user.role != "admin":
        query = query.where(Ticket.owner_id == user.id)

    result = await db.execute(query)
    return result.scalars().all()

