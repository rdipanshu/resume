#!/usr/bin/env python3
"""
Backend API Testing Script for Portfolio Contact Form
Tests the Resend email integration on POST /api/contact
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env
BACKEND_URL = "https://resume-monorepo.preview.emergentagent.com/api"

def print_section(title):
    """Print a formatted section header"""
    print(f"\n{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}\n")

def test_post_contact_valid():
    """Test POST /api/contact with valid payload"""
    print_section("TEST 1: POST /api/contact with valid payload")
    
    payload = {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "subject": "Portfolio Inquiry",
        "message": "I am interested in discussing a potential collaboration on a web development project."
    }
    
    print(f"Sending POST request to: {BACKEND_URL}/contact")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=payload, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"Response Body: {json.dumps(data, indent=2)}")
            
            # Verify response structure
            if "id" in data and "created_at" in data:
                print("\n✅ PASS: Response contains 'id' and 'created_at'")
                print(f"   - ID: {data['id']}")
                print(f"   - Created At: {data['created_at']}")
                return True, data['id']
            else:
                print("\n❌ FAIL: Response missing 'id' or 'created_at'")
                return False, None
        else:
            print(f"\n❌ FAIL: Expected status 201, got {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"\n❌ FAIL: Exception occurred: {str(e)}")
        return False, None

def test_get_contact_persistence(expected_id=None):
    """Test GET /api/contact to verify message persistence"""
    print_section("TEST 2: GET /api/contact - Verify persistence")
    
    print(f"Sending GET request to: {BACKEND_URL}/contact")
    
    try:
        response = requests.get(f"{BACKEND_URL}/contact", timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of messages retrieved: {len(data)}")
            
            if len(data) > 0:
                print(f"\nMost recent message: {json.dumps(data[0], indent=2)}")
                
                if expected_id:
                    # Check if our message is in the list
                    found = any(msg.get('id') == expected_id for msg in data)
                    if found:
                        print(f"\n✅ PASS: Message with ID {expected_id} found in list")
                        return True
                    else:
                        print(f"\n❌ FAIL: Message with ID {expected_id} NOT found in list")
                        return False
                else:
                    print("\n✅ PASS: Messages retrieved successfully")
                    return True
            else:
                print("\n⚠️  WARNING: No messages in database")
                return False
        else:
            print(f"\n❌ FAIL: Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"\n❌ FAIL: Exception occurred: {str(e)}")
        return False

def test_post_contact_validation():
    """Test POST /api/contact with missing required fields"""
    print_section("TEST 3: POST /api/contact - Validation (missing message)")
    
    # Missing 'message' field
    payload = {
        "name": "Bob Smith",
        "email": "bob@example.com",
        "subject": "Test"
    }
    
    print(f"Sending POST request to: {BACKEND_URL}/contact")
    print(f"Payload (missing 'message'): {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=payload, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 422:
            print(f"Response: {response.text}")
            print("\n✅ PASS: Validation error returned (422) for missing field")
            return True
        else:
            print(f"\n❌ FAIL: Expected status 422, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"\n❌ FAIL: Exception occurred: {str(e)}")
        return False

def test_post_contact_empty_name():
    """Test POST /api/contact with empty name"""
    print_section("TEST 4: POST /api/contact - Validation (empty name)")
    
    payload = {
        "name": "",
        "email": "test@example.com",
        "subject": "Test",
        "message": "This should fail"
    }
    
    print(f"Sending POST request to: {BACKEND_URL}/contact")
    print(f"Payload (empty name): {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=payload, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 422:
            print(f"Response: {response.text}")
            print("\n✅ PASS: Validation error returned (422) for empty name")
            return True
        else:
            print(f"\n❌ FAIL: Expected status 422, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"\n❌ FAIL: Exception occurred: {str(e)}")
        return False

def check_backend_logs():
    """Instructions for checking backend logs"""
    print_section("TEST 5: Email Notification - Check Backend Logs")
    
    print("To verify email notification, check backend logs for:")
    print("  - 'Contact notification email sent' (success)")
    print("  - 'Failed to send contact notification email' (failure)")
    print("\nLog files to check:")
    print("  - /var/log/supervisor/backend.out.log")
    print("  - /var/log/supervisor/backend.err.log")
    print("\nNote: Resend in testing mode only delivers to rdipanshu@gmail.com")
    print("A logged email send confirmation (with an id) means success.")
    print("\nIMPORTANT: Email send failures should NOT cause API to fail.")
    print("POST /api/contact must return 201 even if email sending fails.")

def main():
    """Run all tests"""
    print("\n" + "="*70)
    print("  BACKEND API TESTING - Contact Form with Resend Integration")
    print("="*70)
    print(f"\nBackend URL: {BACKEND_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    
    results = []
    
    # Test 1: Valid POST
    success, message_id = test_post_contact_valid()
    results.append(("POST /api/contact (valid)", success))
    
    # Test 2: GET to verify persistence
    success = test_get_contact_persistence(message_id)
    results.append(("GET /api/contact (persistence)", success))
    
    # Test 3: Validation - missing message
    success = test_post_contact_validation()
    results.append(("POST /api/contact (validation - missing field)", success))
    
    # Test 4: Validation - empty name
    success = test_post_contact_empty_name()
    results.append(("POST /api/contact (validation - empty name)", success))
    
    # Test 5: Log check instructions
    check_backend_logs()
    
    # Summary
    print_section("TEST SUMMARY")
    passed = sum(1 for _, success in results if success)
    total = len(results)
    
    for test_name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\n{'='*70}")
    print(f"Total: {passed}/{total} tests passed")
    print(f"{'='*70}\n")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
