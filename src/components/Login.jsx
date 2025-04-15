import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ onBackToHome }) => {
  const navigate = useNavigate(); // Initialize navigate
  
  // Tab state
  const [activeTab, setActiveTab] = useState("signup");
  
  // Form data states
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    country: "",
    dob: ""
  });
  
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState(""); // Added password state
  
  // UI states
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState({
    signupSuccess: false,
    signupError: false,
    signupErrorMessage: "",
    signinSuccess: false,
    signinError: false,
    signinErrorMessage: ""
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    
    if (userId && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);
  
  // Handle tab switching
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Reset messages when changing tabs
    setMessages({
      signupSuccess: false,
      signupError: false,
      signupErrorMessage: "",
      signinSuccess: false,
      signinError: false,
      signinErrorMessage: ""
    });
  };
  
  // Handle signup form changes
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData({
      ...signupData,
      [id.replace("signup-", "")]: value
    });
    
    // Clear error for this field if exists
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: false
      });
    }
  };
  
  // Handle signin form changes
  const handleSigninChange = (e) => {
    const { id, value } = e.target;
    
    if (id === "signin-email") {
      setSigninEmail(value);
      
      // Clear error for this field if exists
      if (errors["signin-email"]) {
        setErrors({
          ...errors,
          "signin-email": false
        });
      }
    } else if (id === "signin-password") {
      setSigninPassword(value);
      
      // Clear error for this field if exists
      if (errors["signin-password"]) {
        setErrors({
          ...errors,
          "signin-password": false
        });
      }
    }
  };
  
  // Validate signup form
  const validateSignupForm = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!signupData.firstName) {
      newErrors["signup-firstName"] = true;
      isValid = false;
    }
    
    if (!signupData.lastName) {
      newErrors["signup-lastName"] = true;
      isValid = false;
    }
    
    if (!signupData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors["signup-email"] = true;
      isValid = false;
    }
    
    if (!signupData.phone || !/^\+?[0-9\-\s]{8,20}$/.test(signupData.phone)) {
      newErrors["signup-phone"] = true;
      isValid = false;
    }
    
    if (!signupData.postalCode) {
      newErrors["signup-postalCode"] = true;
      isValid = false;
    }
    
    if (!signupData.country) {
      newErrors["signup-country"] = true;
      isValid = false;
    }
    
    if (!signupData.dob) {
      newErrors["signup-dob"] = true;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle signup submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }
    
    try {
      // This would be replaced with your actual API call
      // For demo purposes, simulating success
      
      // Uncomment this for actual API integration:
      /*
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          email: signupData.email,
          phone_number: signupData.phone,
          postal_code: signupData.postalCode,
          country: signupData.country,
          date_of_birth: signupData.dob
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Show success message
        setMessages({
          ...messages,
          signupSuccess: true,
          signupError: false
        });
        
        // Reset form
        setSignupData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          postalCode: "",
          country: "",
          dob: ""
        });
        
        // Switch to signin tab after 2 seconds
        setTimeout(() => {
          setActiveTab("signin");
        }, 2000);
      } else {
        // Show error message
        setMessages({
          ...messages,
          signupSuccess: false,
          signupError: true,
          signupErrorMessage: data.message || 'Registration failed. Please try again.'
        });
      }
      */
      
      // Simulation for demo:
      setMessages({
        ...messages,
        signupSuccess: true,
        signupError: false
      });
      
      // Reset form
      setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        postalCode: "",
        country: "",
        dob: ""
      });
      
      // Switch to signin tab after 2 seconds
      setTimeout(() => {
        setActiveTab("signin");
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages({
        ...messages,
        signupSuccess: false,
        signupError: true,
        signupErrorMessage: 'Connection error. Please try again later.'
      });
    }
  };
  
  // Validate signin form
  const validateSigninForm = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!signinEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinEmail)) {
      newErrors["signin-email"] = true;
      isValid = false;
    }
    
    // Validate password (simple non-empty check)
    if (!signinPassword) {
      newErrors["signin-password"] = true;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle signin submission
  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSigninForm()) {
      return;
    }
    
    try {
      // This would be replaced with your actual API call
      // For demo purposes, simulating success
      
      // Uncomment this for actual API integration:
      /*
      const formData = new FormData();
      formData.append('email', signinEmail);
      formData.append('password', signinPassword);
      
      const response = await fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Show success message
        setMessages({
          ...messages,
          signinSuccess: true,
          signinError: false
        });
        
        // Save user info in local storage
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userName', data.name);
        
        // Reset form
        setSigninEmail("");
        setSigninPassword("");
        
        // Show welcome page after 1 second
        setTimeout(() => {
          setIsLoggedIn(true);
          setUserName(data.name);
        }, 1000);
      } else {
        // Show error message
        setMessages({
          ...messages,
          signinSuccess: false,
          signinError: true,
          signinErrorMessage: data.message || 'Sign-in failed. Please try again.'
        });
      }
      */
      
      // Simulation for demo:
      const simulatedName = "User";
      
      setMessages({
        ...messages,
        signinSuccess: true,
        signinError: false
      });
      
      // Save user info in local storage for persistence
      localStorage.setItem('userId', '123456');
      localStorage.setItem('userName', simulatedName);
      
      // Reset form
      setSigninEmail("");
      setSigninPassword("");
      
      // Show welcome page after 1 second
      setTimeout(() => {
        setIsLoggedIn(true);
        setUserName(simulatedName);
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages({
        ...messages,
        signinSuccess: false,
        signinError: true,
        signinErrorMessage: 'Connection error. Please try again later.'
      });
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Reset state
    setIsLoggedIn(false);
    setUserName("");
    setActiveTab("signin");
    setSigninEmail("");
    setSigninPassword("");
    
    // Reset messages
    setMessages({
      signupSuccess: false,
      signupError: false,
      signupErrorMessage: "",
      signinSuccess: false,
      signinError: false,
      signinErrorMessage: ""
    });
  };
  
  // Styles
  const styles = `
    :root {
      --primary-color: #3498db;
      --secondary-color: #2980b9;
      --error-color: #e74c3c;
      --success-color: #2ecc71;
      --text-color: #333;
      --light-bg: #f9f9f9;
    }

    .login-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      color: var(--text-color);
    }

    .login-tabs {
      display: flex;
      background-color: #f1f1f1;
    }

    .login-tab-button {
      flex: 1;
      background: none;
      border: none;
      padding: 15px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-tab-button.active {
      background-color: var(--primary-color);
      color: white;
    }

    .login-tab-content {
      display: none;
      padding: 30px;
    }

    .login-tab-content.active {
      display: block;
    }

    .login-h1 {
      text-align: center;
      margin-bottom: 20px;
      color: var(--primary-color);
    }

    .login-form-group {
      margin-bottom: 20px;
    }

    .login-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .login-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
    }

    .login-error {
      color: var(--error-color);
      font-size: 14px;
      margin-top: 5px;
      display: none;
    }

    .login-error.show {
      display: block;
    }

    .login-button {
      width: 100%;
      padding: 12px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-button:hover {
      background-color: var(--secondary-color);
    }

    .login-message {
      text-align: center;
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
      display: none;
    }

    .login-message.show {
      display: block;
    }

    .login-success-message {
      background-color: rgba(46, 204, 113, 0.2);
      color: var(--success-color);
    }

    .login-error-message {
      background-color: rgba(231, 76, 60, 0.2);
      color: var(--error-color);
    }

    .login-welcome-container {
      text-align: center;
      padding: 40px;
    }

    .login-welcome-container h2 {
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    .login-welcome-container p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    .login-logout-btn {
      background-color: #ccc;
      color: #333;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
      margin-right: 10px;
    }

    .login-logout-btn:hover {
      background-color: #bbb;
    }

    .login-home-btn {
      background-color: var(--primary-color);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .login-home-btn:hover {
      background-color: var(--secondary-color);
    }

    .login-form-row {
      display: flex;
      gap: 20px;
    }

    .login-form-row .login-form-group {
      flex: 1;
    }

    @media (max-width: 768px) {
      .login-form-row {
        flex-direction: column;
        gap: 0;
      }
    }
    
    .home-button {
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 20px auto 0;
      padding: 10px;
      background-color: #333;
      color: white;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      text-decoration: none;
    }
    
    .home-button:hover {
      background-color: #555;
    }
  `;
  
  // Handler for navigating to home route
  const handleNavigateHome = () => {
    navigate('/');
  };
  
  // If user is logged in, show welcome page
  if (isLoggedIn) {
    return (
      <div className="bg-[#121A27] flex items-center justify-center min-h-screen px-4">
        <style>{styles}</style>
        <div className="login-container">
          <div className="login-welcome-container">
            <h2>Welcome to DeepLens Portal</h2>
            <p>Hello, <span id="user-name">{userName}</span>!</p>
            <p>You have successfully signed in.</p>
            <div className="flex justify-center mt-4">
              <button className="login-logout-btn" onClick={handleLogout}>Log Out</button>
              <button className="login-home-btn" onClick={onBackToHome}>Return to Dashboard</button>
            </div>
            {/* New button to navigate to home route */}
            <button 
              className="home-button mt-6" 
              onClick={handleNavigateHome}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#121A27] flex items-center justify-center min-h-screen px-4">
      <style>{styles}</style>
      
      <div className="login-container">
        <div className="login-tabs">
          <button 
            className={`login-tab-button ${activeTab === "signup" ? "active" : ""}`} 
            onClick={() => handleTabChange("signup")}
          >
            Sign Up
          </button>
          <button 
            className={`login-tab-button ${activeTab === "signin" ? "active" : ""}`} 
            onClick={() => handleTabChange("signin")}
          >
            Sign In
          </button>
        </div>

        <div className={`login-tab-content ${activeTab === "signup" ? "active" : ""}`}>
          <h1 className="login-h1">Create an Account</h1>
          <form onSubmit={handleSignupSubmit}>
            <div className="login-form-row">
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-firstName">First Name</label>
                <input 
                  type="text" 
                  id="signup-firstName" 
                  className="login-input" 
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-firstName"] ? "show" : ""}`}>
                  Please enter your first name
                </div>
              </div>
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-lastName">Last Name</label>
                <input 
                  type="text" 
                  id="signup-lastName" 
                  className="login-input" 
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-lastName"] ? "show" : ""}`}>
                  Please enter your last name
                </div>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label" htmlFor="signup-email">Email Address</label>
              <input 
                type="email" 
                id="signup-email" 
                className="login-input" 
                value={signupData.email}
                onChange={handleSignupChange}
                required 
              />
              <div className={`login-error ${errors["signup-email"] ? "show" : ""}`}>
                Please enter a valid email address
              </div>
            </div>

            <div className="login-form-row">
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="signup-phone" 
                  className="login-input" 
                  placeholder="+1234567890" 
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-phone"] ? "show" : ""}`}>
                  Please enter a valid phone number
                </div>
              </div>
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-postalCode">Postal Code</label>
                <input 
                  type="text" 
                  id="signup-postalCode" 
                  className="login-input" 
                  value={signupData.postalCode}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-postalCode"] ? "show" : ""}`}>
                  Please enter your postal code
                </div>
              </div>
            </div>

            <div className="login-form-row">
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-country">Country</label>
                <input 
                  type="text" 
                  id="signup-country" 
                  className="login-input" 
                  value={signupData.country}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-country"] ? "show" : ""}`}>
                  Please enter your country
                </div>
              </div>
              <div className="login-form-group">
                <label className="login-label" htmlFor="signup-dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="signup-dob" 
                  className="login-input" 
                  value={signupData.dob}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`login-error ${errors["signup-dob"] ? "show" : ""}`}>
                  Please enter a valid date of birth
                </div>
              </div>
            </div>

            <div className={`login-message login-success-message ${messages.signupSuccess ? "show" : ""}`}>
              Registration successful! You can now sign in.
            </div>
            <div className={`login-message login-error-message ${messages.signupError ? "show" : ""}`}>
              {messages.signupErrorMessage || "Registration failed. Please try again."}
            </div>

            <button type="submit" className="login-button">Sign Up</button>
            
            {/* New button to navigate to home route */}
            <button 
              type="button" 
              className="home-button" 
              onClick={handleNavigateHome}
            >
              Back to Home
            </button>
          </form>
        </div>

        <div className={`login-tab-content ${activeTab === "signin" ? "active" : ""}`}>
          <h1 className="login-h1">Welcome Back</h1>
          <form onSubmit={handleSigninSubmit}>
            <div className="login-form-group">
              <label className="login-label" htmlFor="signin-email">Email Address</label>
              <input 
                type="email" 
                id="signin-email" 
                className="login-input" 
                value={signinEmail}
                onChange={handleSigninChange}
                required 
              />
              <div className={`login-error ${errors["signin-email"] ? "show" : ""}`}>
                Please enter a valid email address
              </div>
            </div>
            
            {/* New password field */}
            <div className="login-form-group">
              <label className="login-label" htmlFor="signin-password">Password</label>
              <input 
                type="password" 
                id="signin-password" 
                className="login-input" 
                value={signinPassword}
                onChange={handleSigninChange}
                required 
              />
              <div className={`login-error ${errors["signin-password"] ? "show" : ""}`}>
                Please enter your password
              </div>
            </div>

            <div className={`login-message login-success-message ${messages.signinSuccess ? "show" : ""}`}>
              Sign-in successful!
            </div>
            <div className={`login-message login-error-message ${messages.signinError ? "show" : ""}`}>
              {messages.signinErrorMessage || "Sign-in failed. Please try again."}
            </div>

            <button type="submit" className="login-button">Sign In</button>
            
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={onBackToHome} 
                className="text-[#3498db] hover:text-[#2980b9] text-sm"
              >
                Return to dashboard
              </button>
            </div>
            
            {/* New button to navigate to home route */}
            <button 
              type="button" 
              className="home-button" 
              onClick={handleNavigateHome}
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;