"use client";
import React from "react";
import { useAuth } from "@/components/data/authProvider";
import { Profile } from "@/components/Profile";
import Link from "next/link";
import { RxCaretLeft } from "react-icons/rx";

const Page = () => {
  const { user } = useAuth();
  
  return <div className='w-full flex flex-col gap-5 p-10'>
    <Link href='/home' className=" flex items-center gap-2 px-5 py-2 text-indigo-600 text-base"><RxCaretLeft/> Back </Link>
    <Profile user={user}/>
  </div>;
};

export default Page;
