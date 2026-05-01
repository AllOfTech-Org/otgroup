import { useState, useEffect } from "react";
import API from "../api";

export default function Login() {
    const [role, setRole] = useState("owner");
    const [email, setEmail] = useState("owner@alloftech.demo");
    const [password, setPassword] = useState("demo");
    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);
    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email, password, role });
            localStorage.setItem("token", res.data.token);
        } catch {
            alert("Login failed");
        }
    };
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden login-bg">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
            <div className="blob blob-4" />
            <div className="shape shape-wavy shape-left-top" />
            <div className="shape shape-wavy shape-left-bottom" />
            <div className="shape shape-spiral shape-right-top" />
            <div className="shape shape-spiral shape-right-bottom" />
            <div className="shape shape-circle shape-bottom-left" />
            <div className="shape shape-circle shape-top-right" />
            <div className="shape shape-wavy shape-extra-1" />
            <div className="shape shape-spiral shape-extra-2" />
            <div className="shape shape-circle shape-extra-3" />
            <div className="shape shape-wavy shape-extra-4" />
            <div className={`glass-card ${mounted ? "card-visible" : "card-hidden"}`}>
                <div className="logo-area">
                    <div className="logo-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                            <path d="M20 4C11.163 4 4 11.163 4 20C4 28.837 11.163 36 20 36C28.837 36 36 28.837 36 20C36 11.163 28.837 4 20 4Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                            <path d="M14 20C14 16.686 16.686 14 20 14C23.314 14 26 16.686 26 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="20" cy="26" r="3" fill="white" />
                        </svg>
                    </div>
                    <span className="logo-text">Your logo</span>
                </div>
                <h2 className="login-title">Login</h2>
                <div className={`field-group ${mounted ? "field-visible field-delay-1" : "field-hidden"}`}>
                    <label className="field-label">Email</label>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            className="glass-input"
                            placeholder="username@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className={`field-group ${mounted ? "field-visible field-delay-2" : "field-hidden"}`}>
                    <label className="field-label">Password</label>
                    <div className="input-wrapper input-with-icon">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="glass-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`forgot-row ${mounted ? "field-visible field-delay-3" : "field-hidden"}`}>
                    <button type="button" className="forgot-btn">Forgot Password?</button>
                </div>
                <div className={`role-selector ${mounted ? "field-visible field-delay-3" : "field-hidden"}`}>
                    <button
                        type="button"
                        onClick={() => setRole("owner")}
                        className={`role-btn ${role === "owner" ? "role-active" : ""}`}
                    >
                        Owner
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("staff")}
                        className={`role-btn ${role === "staff" ? "role-active" : ""}`}
                    >
                        Staff
                    </button>
                </div>
                <div className={`${mounted ? "field-visible field-delay-4" : "field-hidden"}`}>
                    <button type="button" onClick={handleLogin} className="signin-btn">
                        Sign in
                    </button>
                </div>
                <div className={`divider-row ${mounted ? "field-visible field-delay-5" : "field-hidden"}`}>
                    <div className="divider-line" />
                    <span className="divider-text">or continue with</span>
                    <div className="divider-line" />
                </div>
                <div className={`social-row ${mounted ? "field-visible field-delay-5" : "field-hidden"}`}>
                    <button type="button" className="social-btn" title="Google">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </button>
                    <button type="button" className="social-btn" title="GitHub">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </button>
                    <button type="button" className="social-btn" title="Facebook">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                </div>
                <p className={`register-row ${mounted ? "field-visible field-delay-6" : "field-hidden"}`}>
                    Don't have an account yet?{" "}
                    <button type="button" className="register-link">Register for free</button>
                </p>
            </div>
        </div>
    );
}