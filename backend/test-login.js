// Test script to verify login functionality
import axios from 'axios';

const testLogin = async () => {
  try {
    console.log('🧪 Testing Login API...');
    
    // Test 1: Valid login
    console.log('\n📝 Test 1: Valid login with existing user');
    const validLogin = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
      role: 'Student'
    });
    console.log('✅ Valid login response:', validLogin.data);
    
    // Test 2: Invalid email
    console.log('\n📝 Test 2: Invalid email');
    const invalidEmail = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'nonexistent@example.com',
      password: 'password123',
      role: 'Student'
    }).catch(err => {
      console.log('❌ Invalid email response:', err.response?.data);
    });
    
    // Test 3: Invalid password
    console.log('\n📝 Test 3: Invalid password');
    const invalidPassword = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'wrongpassword',
      role: 'Student'
    }).catch(err => {
      console.log('❌ Invalid password response:', err.response?.data);
    });
    
    // Test 4: Invalid role
    console.log('\n📝 Test 4: Invalid role');
    const invalidRole = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
      role: 'Admin'
    }).catch(err => {
      console.log('❌ Invalid role response:', err.response?.data);
    });
    
  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
};

// Run tests
testLogin();
