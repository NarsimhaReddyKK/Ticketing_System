from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.ticket import Ticket
from app.models.enums import TicketStatus
from app.core.dependencies import admin_only

router = APIRouter(prefix="/admin")

@router.patch("/users/{user_id}/make-user")
async def make_user_normal(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    admin=Depends(admin_only),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(404, "User not found")

    user.role = "user"
    await db.commit()

    return {"message": "User demoted to user"}
