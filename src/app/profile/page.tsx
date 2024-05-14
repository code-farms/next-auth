"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("res", res.data.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Profule page</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button onClick={getUserDetails}>Get user details</button>
      <hr />
      <button onClick={logout}>Log out</button>
    </div>
  );
}
