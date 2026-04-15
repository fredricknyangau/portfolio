from pydantic import BaseModel, EmailStr, Field

class ContactPayload(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)

class ContactResponse(BaseModel):
    success: bool
    message: str
