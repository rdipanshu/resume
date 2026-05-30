"""Backend API tests for portfolio app: health, contact (POST/GET, validation)."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://resume-showcase-504.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health check
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Portfolio" in data["message"]


# Contact CRUD
class TestContact:
    def test_post_contact_success(self, api):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST Hello",
            "message": "TEST_Message_Persisted"
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data

        # Verify persistence via GET
        list_r = api.get(f"{BASE_URL}/api/contact")
        assert list_r.status_code == 200
        items = list_r.json()
        assert any(it.get("id") == data["id"] for it in items), "Created contact not found in list"

    def test_post_contact_invalid_email(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "not-an-email",
            "message": "hi"
        })
        assert r.status_code == 422

    def test_post_contact_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "", "email": "a@b.com", "message": ""})
        assert r.status_code == 422

    def test_get_contact_list(self, api):
        r = api.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # ensure _id not exposed
        for item in data:
            assert "_id" not in item
