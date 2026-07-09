import React, { useState } from 'react'
import { signUpStyles, signUpCSS } from '../assets/dummyStyles'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowLeft, Ticket, User, Mail, Phone, Calendar, Lock, Eye, EyeOff } from 'lucide-react'

import axios from 'axios';
const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:5000') + '/api/auth';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormData((prevState)=>({
        ...prevState,
        [name]: value,
    }));
    if(errors[name])
    {
        setErrors((prev)=>({
            ...prev,
            [name]:"",
        }))
    }
  };

  //function to validate all the fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 13) {
        newErrors.birthDate = "You must be at least 13 years old";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goBack=()=>{
    window.history.back();
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validateForm()){
        toast.error("please fix the form errors")
        return;
    }
    console.log("Form submitted:", {
        ...formData,
        password: "*****" + formData.password.slice(-2) ,// Mask the password in logs
    });
    setIsLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        birthDate: formData.birthDate,
        password: formData.password,
      };

      const response = await axios.post(`${API_BASE}/register`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data && response.data.success) {
        toast.success("Account Created Successfully! Redirecting to Login...");

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } else {
        toast.error(response.data?.message || "Registration Failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      // If backend returned an error message, try to map it to a field
      const serverMsg =
        err?.response?.data?.message || err?.message || "Server error";

      // Map common backend messages to the form fields
      if (serverMsg.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: serverMsg }));
      } else if (serverMsg.toLowerCase().includes("username")) {
        setErrors((prev) => ({ ...prev, username: serverMsg }));
      } else if (serverMsg.toLowerCase().includes("phone")) {
        setErrors((prev) => ({ ...prev, phone: serverMsg }));
      } else {
        toast.error(serverMsg);
      }
    } finally{
      setIsLoading(false);
    }

  };

  return (
    <div className={signUpStyles.container}>
      <div className={signUpStyles.particlesContainer}>
        {
          [...Array(15)].map((_, i) => (
            <div
              key={i}
              className={signUpStyles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          )) 
        }
      </div>
      
      <div className={signUpStyles.gradientOrbs}>
        <div className={signUpStyles.orb1}>
          <div className={signUpStyles.orb2}></div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className={signUpStyles.mainContent}>
        <div className="w-full flex justify-start mb-4">
          <button onClick={goBack} className="flex items-center text-red-400 hover:text-red-300 transition-all duration-300 group cursor-pointer">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform mr-2" />
            <span className="font-cinema text-sm font-medium">Back</span>
          </button>
        </div>
        
        <div className={signUpStyles.card}>
          <div className={signUpStyles.cardHeader}></div>
          <div className={signUpStyles.cardContent}>
            <div className={signUpStyles.header}>
              <div className={signUpStyles.headerFlex}>
                <Ticket className={signUpStyles.headerIcon} size={35}/>
                <h2 className={signUpStyles.headerTitle}>Join Our Cinema</h2>
              </div>
              <p className={signUpStyles.headerSubtitle}>
                Create your journey for cinematic experience
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className={signUpStyles.form}>
              <div className={signUpStyles.formGrid}>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className={signUpStyles.field}>
                    Full Name
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`${signUpStyles.input.base} ${errors.fullName ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <User className={signUpStyles.inputIcon} size={20} />
                  </div>
                  {errors.fullName && <p className={signUpStyles.errorText}>{errors.fullName}</p>}
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className={signUpStyles.field}>
                    Username
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe123"
                      className={`${signUpStyles.input.base} ${errors.username ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <User className={signUpStyles.inputIcon} size={20} />
                  </div>
                  {errors.username && <p className={signUpStyles.errorText}>{errors.username}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className={signUpStyles.field}>
                    Email Address
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`${signUpStyles.input.base} ${errors.email ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <Mail className={signUpStyles.inputIcon} size={20} />
                  </div>
                  {errors.email && <p className={signUpStyles.errorText}>{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className={signUpStyles.field}>
                    Phone Number
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      max={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1234567890"
                      className={`${signUpStyles.input.base} ${errors.phone ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <Phone className={signUpStyles.inputIcon} size={20} />
                  </div>
                  {errors.phone && <p className={signUpStyles.errorText}>{errors.phone}</p>}
                </div>

                {/* Birth Date */}
                <div>
                  <label htmlFor="birthDate" className={signUpStyles.field}>
                    Birth Date
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`${signUpStyles.input.base} ${errors.birthDate ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <Calendar className={signUpStyles.inputIcon} size={20} />
                  </div>
                  {errors.birthDate && <p className={signUpStyles.errorText}>{errors.birthDate}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className={signUpStyles.field}>
                    Password
                  </label>
                  <div className={signUpStyles.inputContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`${signUpStyles.input.base} ${signUpStyles.inputWithToggle} ${errors.password ? signUpStyles.input.error : signUpStyles.input.normal}`}
                    />
                    <Lock className={signUpStyles.inputIcon} size={20} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={signUpStyles.passwordToggle}
                    >
                      {showPassword ? <EyeOff className={signUpStyles.toggleIcon} size={20} /> : <Eye className={signUpStyles.toggleIcon} size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className={signUpStyles.errorText}>{errors.password}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className={signUpStyles.submitContainer}>
                <button 
                  type="submit" 
                  className={`${signUpStyles.submitButton.base} ${isLoading ? signUpStyles.submitButton.loading : ''}`} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className={signUpStyles.submitContent}>
                      <div className={signUpStyles.loadingSpinner}></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className={signUpStyles.submitContent}>
                      <span>Create Account</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
            
            {/* Redirect to Login */}
            <div className={signUpStyles.loginContainer}>
              <p className={signUpStyles.loginText}>
                Already have an account?{" "}
                <a href="/login" className={signUpStyles.loginLink}>
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{signUpCSS}</style>
    </div>
  );
};

export default SignUpPage

