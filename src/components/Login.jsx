import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onBackToHome }) => {
  const navigate = useNavigate();
  
  // Tab state
  const [activeTab, setActiveTab] = useState("signup");
  
  // Form data states
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Added password field
    phone: "",
    postalCode: "",
    country: "",
    dob: ""
  });
  
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  
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
    
    // Password validation - must be at least 8 characters
    if (!signupData.password || signupData.password.length < 8) {
      newErrors["signup-password"] = true;
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
          password: signupData.password,
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
          password: "",
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
        password: "",
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
      // Extract the name from the email (everything before @)
      const simulatedName = signinEmail.split('@')[0] || "User";
      
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
  
  // Handler for navigating to home route
  const handleNavigateHome = () => {
    navigate('/');
  };
  
  // Handler for navigating to dashboard
  const handleNavigateToDashboard = () => {
    navigate('/dashboard-analysis');
  };
  
  // If user is logged in, show welcome page
  if (isLoggedIn) {
    return (
      <div className="bg-[#121A27] flex items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
          <div className="text-center py-10 px-6">
            <h2 className="text-2xl font-bold text-blue-500 mb-5">Welcome to DeepLens Portal</h2>
            <p className="text-lg mb-2">Hello, <span id="user-name">{userName}</span>!</p>
            <p className="text-lg mb-6">You have successfully signed in.</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button 
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" 
                onClick={handleLogout}
              >
                Log Out
              </button>
              <button 
                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" 
                onClick={onBackToHome || handleNavigateToDashboard}
              >
                Return to Dashboard
              </button>
            </div>
            <button 
              className="mt-6 px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors mx-auto block"
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
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
        <div className="flex bg-gray-100">
          <button 
            className={`flex-1 py-4 font-bold text-base border-none transition-colors ${activeTab === "signup" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => handleTabChange("signup")}
          >
            Sign Up
          </button>
          <button 
            className={`flex-1 py-4 font-bold text-base border-none transition-colors ${activeTab === "signin" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => handleTabChange("signin")}
          >
            Sign In
          </button>
        </div>

        <div className={`p-8 ${activeTab === "signup" ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Create an Account</h1>
          <form onSubmit={handleSignupSubmit}>
            <div className="flex flex-col md:flex-row md:gap-5 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block font-semibold mb-2" htmlFor="signup-firstName">First Name</label>
                <input 
                  type="text" 
                  id="signup-firstName" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-firstName"] ? "block" : "hidden"}`}>
                  Please enter your first name
                </div>
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2" htmlFor="signup-lastName">Last Name</label>
                <input 
                  type="text" 
                  id="signup-lastName" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-lastName"] ? "block" : "hidden"}`}>
                  Please enter your last name
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="signup-email">Email Address</label>
              <input 
                type="email" 
                id="signup-email" 
                className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                value={signupData.email}
                onChange={handleSignupChange}
                required 
              />
              <div className={`text-red-500 text-sm mt-1 ${errors["signup-email"] ? "block" : "hidden"}`}>
                Please enter a valid email address
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="signup-password">Password</label>
              <input 
                type="password" 
                id="signup-password" 
                className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                value={signupData.password}
                onChange={handleSignupChange}
                required 
              />
              <div className={`text-red-500 text-sm mt-1 ${errors["signup-password"] ? "block" : "hidden"}`}>
                Password must be at least 8 characters
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-5 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block font-semibold mb-2" htmlFor="signup-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="signup-phone" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  placeholder="+1234567890" 
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-phone"] ? "block" : "hidden"}`}>
                  Please enter a valid phone number
                </div>
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2" htmlFor="signup-postalCode">Postal Code</label>
                <input 
                  type="text" 
                  id="signup-postalCode" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  value={signupData.postalCode}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-postalCode"] ? "block" : "hidden"}`}>
                  Please enter your postal code
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-5 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block font-semibold mb-2" htmlFor="signup-country">Country</label>
                <input 
                  type="text" 
                  id="signup-country" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  value={signupData.country}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-country"] ? "block" : "hidden"}`}>
                  Please enter your country
                </div>
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2" htmlFor="signup-dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="signup-dob" 
                  className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                  value={signupData.dob}
                  onChange={handleSignupChange}
                  required 
                />
                <div className={`text-red-500 text-sm mt-1 ${errors["signup-dob"] ? "block" : "hidden"}`}>
                  Please enter a valid date of birth
                </div>
              </div>
            </div>

            <div className={`text-center py-4 px-3 my-4 rounded ${messages.signupSuccess ? "block bg-green-100 text-green-600" : "hidden"}`}>
              Registration successful! You can now sign in.
            </div>
            <div className={`text-center py-4 px-3 my-4 rounded ${messages.signupError ? "block bg-red-100 text-red-600" : "hidden"}`}>
              {messages.signupErrorMessage || "Registration failed. Please try again."}
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
            
            <button 
              type="button" 
              className="w-full max-w-xs mx-auto mt-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors block"
              onClick={handleNavigateHome}
            >
              Back to Home
            </button>
          </form>
        </div>

        <div className={`p-8 ${activeTab === "signin" ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Welcome Back</h1>
          <form onSubmit={handleSigninSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="signin-email">Email Address</label>
              <input 
                type="email" 
                id="signin-email" 
                className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                value={signinEmail}
                onChange={handleSigninChange}
                required 
              />
              <div className={`text-red-500 text-sm mt-1 ${errors["signin-email"] ? "block" : "hidden"}`}>
                Please enter a valid email address
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="signin-password">Password</label>
              <input 
                type="password" 
                id="signin-password" 
                className="w-full px-3 py-3 border border-gray-300 rounded text-base" 
                value={signinPassword}
                onChange={handleSigninChange}
                required 
              />
              <div className={`text-red-500 text-sm mt-1 ${errors["signin-password"] ? "block" : "hidden"}`}>
                Please enter your password
              </div>
            </div>

            <div className={`text-center py-4 px-3 my-4 rounded ${messages.signinSuccess ? "block bg-green-100 text-green-600" : "hidden"}`}>
              Sign-in successful!
            </div>
            <div className={`text-center py-4 px-3 my-4 rounded ${messages.signinError ? "block bg-red-100 text-red-600" : "hidden"}`}>
              {messages.signinErrorMessage || "Sign-in failed. Please try again."}
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
            
            <div className="mt-4 text-center">
            
            </div>
            
            <button 
              type="button" 
              className="w-full max-w-xs mx-auto mt-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors block"
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