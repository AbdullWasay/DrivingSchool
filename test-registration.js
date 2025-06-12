const axios = require("axios");

async function testRegistration() {
  try {
    const API_URL = process.env.API_URL || "http://localhost:5000/api";
    const response = await axios.post(`${API_URL}/auth/register`, {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "benutzer",
    });

    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    console.error("Status:", error.response?.status);
  }
}

testRegistration();
