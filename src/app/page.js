'use client'
import React, { useEffect } from "react";
import { useAuth } from "../components/data/authProvider";
import Login from "../components/Login";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);


  if (loading) return null;

  return (
    <>
      <section>{!user && <Login />}</section>
    </>
  );
}

