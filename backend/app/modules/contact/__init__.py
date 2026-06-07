"""Contact feature module.

This module re-exports the contact router, services, and schemas from the
existing locations so the application can include feature routers via
`app.modules.contact` during the modular monolith migration.
"""

from app.modules.contact.routers import router as router
from app.modules.contact.services import (
    dispatch_contact_notification,
)
from app.modules.contact.schemas import ContactPayload, ContactResponse

__all__ = [
    "router",
    "dispatch_contact_notification",
    "ContactPayload",
    "ContactResponse",
]
