import { useState } from "react";
import API from "../api";

export default function Login() {
    const [role, setRole] = useState("owner");
    const [email, setEmail] = useState("owner@alloftech.demo");
    const [password, setPassword] = useState("demo");

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email, password, role });
            localStorage.setItem("token", res.data.token);
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex bg-bgLight">

            {/* LEFT SIDE */}
            <div className="w-1/2 hidden md:flex flex-col justify-center p-16">

                {/* Logo + Title */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-textMain rounded-xl"></div>
                    <div>
                        <h2 className="font-semibold text-textMain text-base">
                            AllOfTech Export Shipping
                        </h2>
                        <p className="text-sm text-gray-400">
                            Business Management Dashboard
                        </p>
                    </div>
                </div>

                {/* Demo Card */}
                <div className="border border-borderColor rounded-2xl p-6 bg-card shadow-sm">
                    <h3 className="font-semibold text-textMain mb-1">Demo experience</h3>
                    <p className="text-sm text-gray-400 mb-5">
                        High-fidelity, fully navigable UI. Mock data only.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: "Modules", value: "Buyers, Workers, Inventory" },
                            { label: "Finance", value: "Invoices & Payments" },
                            { label: "UX", value: "Skeleton loading, badges" },
                            { label: "Data", value: "Local state + static JSON" },
                        ].map((item) => (
                            <div key={item.label} className="border border-borderColor rounded-xl p-3">
                                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                                <p className="text-sm font-semibold text-textMain">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-gray-400 mt-5">
                    Sign in is simulated for presentation purposes. No passwords are stored and no network calls are made.
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full md:w-1/2 justify-center items-center">
                <div className="bg-card p-8 rounded-2xl shadow-lg border border-borderColor w-[400px]">

                    <h2 className="text-xl font-semibold text-textMain mb-5">Sign in</h2>

                    {/* Email */}
                    <label className="text-sm text-gray-500 mb-1 block">Email</label>
                    <input
                        className="w-full border border-borderColor p-2.5 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}
                    <label className="text-sm text-gray-500 mb-1 block">Password</label>
                    <input
                        type="password"
                        className="w-full border border-borderColor p-2.5 rounded-xl mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Role Selection */}
                    <p className="text-sm font-medium text-textMain mb-1">Select role</p>
                    <p className="text-xs text-gray-400 mb-3">UI adapts subtly for the chosen role.</p>

                    <div className="flex gap-3 mb-5">
                        <button
                            onClick={() => setRole("owner")}
                            className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                role === "owner"
                                    ? "bg-gray-50 border-gray-400 shadow-sm"
                                    : "border-borderColor"
                            }`}
                        >
                            <p className="font-semibold text-sm text-textMain">Owner</p>
                            <p className="text-xs text-gray-400 mt-0.5">Full visibility across finance, staff, and documents.</p>
                        </button>

                        <button
                            onClick={() => setRole("staff")}
                            className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                role === "staff"
                                    ? "bg-gray-50 border-gray-400 shadow-sm"
                                    : "border-borderColor"
                            }`}
                        >
                            <p className="font-semibold text-sm text-textMain">Staff</p>
                            <p className="text-xs text-gray-400 mt-0.5">Operational tools with limited finance actions.</p>
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-textMain hover:bg-primaryDark text-white p-3 rounded-xl text-sm font-medium transition-colors"
                    >
                        Continue to dashboard
                    </button>

                    <p className="text-xs text-gray-400 mt-4">
                        Tip: This demo includes interactive detail pages (click table rows) and safe mock actions (mark invoice paid, add expenses).
                    </p>
                </div>
            </div>
        </div>
    );
}