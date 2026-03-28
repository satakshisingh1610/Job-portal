// Test script to verify signup functionality
import axios from 'axios';

const testSignup = async () => {
  try {
    console.log('🧪 Testing Signup API...');
    
    // Test 1: Valid signup
    console.log('\n📝 Test 1: Valid signup with new user');
    const validSignup = await axios.post('http://localhost:5000/api/auth/register', {
      fullname: 'Test User',
      email: 'newuser@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      role: 'Student'
    });
    console.log('✅ Valid signup response:', validSignup.data);
    
    // Test 2: Duplicate email
    console.log('\n📝 Test 2: Duplicate email signup');
    const duplicateEmail = await axios.post('http://localhost:5000/api/auth/register', {
      fullname: 'Test User 2',
      email: 'newuser@example.com', // Same email as above
      password: 'password123',
      phoneNumber: '0987654321',
      role: 'Student'
    }).catch(err => {
      console.log('❌ Duplicate email response:', err.response?.data);
    });
    
    // Test 3: Missing required fields
    console.log('\n📝 Test 3: Missing required fields');
    const missingFields = await axios.post('http://localhost:5000/api/auth/register', {
      fullname: 'Test User 3',
      email: 'test3@example.com',
      // Missing password and phoneNumber
      role: 'Student'
    }).catch(err => {
      console.log('❌ Missing fields response:', err.response?.data);
    });
    
    // Test 4: Invalid email format
    console.log('\n📝 Test 4: Invalid email format');
    const invalidEmail = await axios.post('http://localhost:5000/api/auth/register', {
      fullname: 'Test User 4',
      email: 'invalid-email',
      password: 'password123',
      phoneNumber: '5555555555',
      role: 'Student'
    }).catch(err => {
      console.log('❌ Invalid email response:', err.response?.data);
    });
    
  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
};

// Run tests
testSignup();
