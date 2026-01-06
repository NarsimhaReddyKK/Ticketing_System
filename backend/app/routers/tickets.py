from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate, TicketResponse
from app.models.enums import TicketStatus
from app.core.dependencies import get_current_user
from sqlalchemy.orm import joinedload

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.get("/", response_model=list[TicketResponse])
async def get_all_tickets(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
):
    query = select(Ticket).options(joinedload(Ticket.owner))

    # Non-admin → only own tickets
    if current_user.role != "admin":
        query = query.where(Ticket.owner_id == current_user.id)

    result = await db.execute(query)
    tickets = result.scalars().all()

    # Build response manually to control admin-only fields
    response = []
    for ticket in tickets:
        data = {
            "id": ticket.id,
            "title": ticket.title,
            "description": ticket.description,
            "status": ticket.status,
            "owner_id": ticket.owner_id,
            "created_at": ticket.created_at,
        }

        # Admin gets owner name
        if current_user.role == "admin":
            data["owner_name"] = ticket.owner.username

        response.append(data)

    return response


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

@router.get("/status/{status}", response_model=list[TicketResponse])
async def filter_tickets(
    status: TicketStatus,
    user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Ticket).where(Ticket.status == status)
    result = await db.execute(query)
    return result.scalars().all()