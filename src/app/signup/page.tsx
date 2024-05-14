"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSingup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      setLoading(false);
      setButtonDisabled(false);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup error", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length && user.username.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h1>{loading ? "Processing" : "Signup"} </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        className=""
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
      />
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
      <button onClick={onSingup} className="">
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
