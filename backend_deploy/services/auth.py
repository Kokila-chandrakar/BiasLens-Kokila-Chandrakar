"""
BiasLens — services/auth.py
Cleaned for Firebase Authentication integration.
"""
from typing import Optional
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = "user"
    uid: Optional[str] = None

def is_admin(email: str):
    return email.lower() == "ayushbhatnagar71@gmail.com"