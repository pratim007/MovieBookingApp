import React, { useState } from 'react'
import {loginStyles} from '../assets/dummyStyles'
import {toast, ToastContainer} from 'react-toastify'
import { ArrowLeft, Clapperboard, Eye, EyeOff, Film } from 'lucide-react';
import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:5000') + '/api/auth';

const LoginPage = () => {
     const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const goBack =()=>{
    window.history.back();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    if(!formData.email || !formData.password || formData.password.length < 6){
      
      toast.error("Please fill all fields and ensure password is at least 6 characters long.", {
        position: "top-right",
        autoClose: 2000,
    });
    
      return;
    }
    try {
        const payload = {
            email: formData.email.trim(),
            password: formData.password,
        };
        const res = await axios.post(`${API_BASE}/login`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        const data = res.data;
        if (data && data.success) {
        toast.success(data.message || "Login successful! Redirecting...");

        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        try {
            const userToStore = data.user || { email: formData.email };
            localStorage.setItem(
            "cine_auth",
            JSON.stringify({
              isLoggedIn: true,
              email: userToStore.email || formData.email,
            })
          );
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem(
            "userEmail",
            userToStore.email || formData.email || ""
          );
          localStorage.setItem(
            "cine_user_email",
            userToStore.email || formData.email || ""
          );
          localStorage.setItem("user", JSON.stringify(userToStore));
        } catch (e) {
            // Handle potential JSON stringify error if userToStore is not serializable
            console.error("Failed to process user data", e);
        }
        setTimeout(() => {
            window.location.href = "/";
            }, 1200);
            } else {
            toast.error(data?.message || "Login Failed");
            }
            } catch (err) {
            console.error("login error:", err);
            const constMsg = err?.response?.data?.message || err?.message || "Server error";
            
            // Map common backend messages to specific UI responses
            const msgLower = String(constMsg).toLowerCase();
            if (msgLower.includes("password") || msgLower.includes("invalid")) {
                toast.error(constMsg);
            } else if (msgLower.includes("email")) {
                toast.error(constMsg);
            } else {
                toast.error(constMsg);
            }
            } finally{
                setIsLoading(false);
            }
        

        const goBack = () => {
        window.location.href='/';
        };

  }

  return (
    <div className={loginStyles.pageContainer}>

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
      <div className="relative w-full max-w-md z-10">
        <div className={loginStyles.backButtonContainer}>
            <button onClick={goBack} className={loginStyles.backButton}>
                <ArrowLeft size={20} className={loginStyles.backButtonIcon}/>
                <span className={loginStyles.backButtonText}>Back to home</span>
            </button>
        </div>
        <div className={loginStyles.cardContainer}>
            <div className={loginStyles.cardHeader}></div>
                <div className={loginStyles.cardContent}>
                    <div className={loginStyles.headerContainer}>
                        <div className={loginStyles.headerIconContainer}>
                            <Film className={loginStyles.headerIcon} size={28}/>
                            <h2 className={loginStyles.headerTitle}>
                                Cinema Acccess
                            </h2>
                        
                    </div>
                    <p className={loginStyles.headerSubtitle}>Enter your credentials to access the cinema</p>
                </div>
                <form onSubmit={handleSubmit} className={loginStyles.formContainer}>
                    <div className={loginStyles.inputGroup}>
                        <label htmlFor="email" className={loginStyles.label}>Email</label>
                        <div className={loginStyles.inputContainer}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={loginStyles.input}
                                placeholder="Enter your email"
                            />
                            <div className={loginStyles.inputIcon}>
                                <Clapperboard size={20} />
                            </div>
                        </div>
                    </div>
                    <div className={loginStyles.inputGroup}>
                        <label htmlFor="password" className={loginStyles.label}>Password</label>
                        <div className={loginStyles.inputContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={loginStyles.inputWithIcon}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={loginStyles.passwordToggle}
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        </div>
                    <button type="submit" className={loginStyles.submitButton} disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Access Cinema"}
                    </button>

                    </form>

            </div>

        </div>
        <div className={loginStyles.footerContainer}>
            <p className={loginStyles.footerText}>
                Don't have a account? {" "}
                <a href="/signup" className={loginStyles.footerLink}>
                 Create an Account
                </a>
            </p>
        </div>
      </div>
      <style>{loginStyles.customCSS}</style>
    </div>
  )
}

export default LoginPage
