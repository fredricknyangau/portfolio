from fastapi import APIRouter, Depends, BackgroundTasks, status
from app.schemas.contact import ContactPayload, ContactResponse
from app.services.contact_service import dispatch_contact_notification
from app.api.deps import check_rate_limit

router = APIRouter()

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    payload: ContactPayload,
    background_tasks: BackgroundTasks,
    _: bool = Depends(check_rate_limit)
):
    """
    Submits a contact form payload. Performs validation, checks rate limits, 
    and enqueues the notification dispatch to a background task so the API 
    returns immediately to the client.
    """
    background_tasks.add_task(dispatch_contact_notification, payload)
    
    return ContactResponse(
        success=True,
        message="Message queued for dispatch successfully."
    )
