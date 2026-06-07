import pytest

def test_contact_success(client, mock_telegram, mock_smtp):
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message that is long enough."
    }
    
    response = client.post("/api/v1/contact", json=payload)
    
    assert response.status_code == 201
    assert response.json() == {
        "success": True,
        "message": "Message queued for dispatch successfully."
    }

def test_contact_validation_error_email(client):
    payload = {
        "name": "Test User",
        "email": "not-an-email",
        "message": "This is a test message that is long enough."
    }
    
    response = client.post("/api/v1/contact", json=payload)
    
    assert response.status_code == 422
    assert "email" in response.text.lower()

def test_contact_validation_error_message_too_short(client):
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Short"
    }
    
    response = client.post("/api/v1/contact", json=payload)
    
    assert response.status_code == 422
    assert "message" in response.text.lower()
