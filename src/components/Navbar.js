"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React, { useState, useEffect} from "react";
import { useAuth } from "./data/authProvider";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { deleteUserAccountAndData } from "./deleteExercise";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const { user, logout, setactiveMenu, activeMenu } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const theme = document.body.classList;
    setDark(theme.contains("dark"))
  }, [])
  

  const darkMode = (e) => {
    document.body.classList.toggle("dark")
    setDark((prev)=> !prev)
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccountAndData();
      console.log("Account and data deleted");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finished");
    }
  };

  return (
    user && (
      <div className="bg-white dark:bg-zinc-400 sticky top-0 z-20 m-0">
        <div className=" box-border m-5 shadow-sm mx-auto px-8 py-2 flex gap-10 md:gap-0 items-center md:-start justify-between w-full h-auto">
          <div
            className="block w-fit lg:hidden text-button-blue"
            onClick={() => {
              setactiveMenu((previousMenu) => !previousMenu);
            }}
          >
            {activeMenu ? <IoMdClose /> : <CiMenuFries />}
          </div>
          <div className="flex flex-col gap-1 w-fit text-black">
            <h1 className="text-sm md:text-xl font-semibold">
              Welcome,{" "}
              <span className="text-[#5145cd]">
                {user?.isAnonymous ? "User" : user?.displayName}
              </span>
            </h1>
          </div>
          <div className="w-fit flex items-center text-black gap-2">
            <button
              type="button"
              className=" relative rounded-full p-3 text-xl hover:bg-light-gray"
              onClick={darkMode}
            >
              <span className="absolute rounded-full inline-flex h-2 w-2 right-2 top-2" />

              {dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
            <div className="relative block">
              <div className="dropdown">
                <button className="dropbtn flex gap-5 items-center">
                  <Image
                    alt="user"
                    src={user?.photoURL || "/Avatar.jpg"}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </button>
                <div className="dropdown-content text-[14px]">
                  <Link href="/profile">Profile</Link>
                  <button onClick={logout} className="cursor-pointer w-full">
                    Log Out
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="cursor-pointer w-full"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
