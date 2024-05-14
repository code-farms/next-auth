"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      setLoading(false);
      setButtonDisabled(false);
      router.push("/profile");
    } catch (error: any) {
      console.log("Signup error", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h1>{loading ? "Processing" : "Login"} </h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        className=""
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className=""
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
      />
      <button onClick={onLogin} className="">
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}
