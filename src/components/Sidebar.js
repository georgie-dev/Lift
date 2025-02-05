"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { RiLiveLine } from "react-icons/ri";
import { PiBowlFoodLight } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { useAuth } from "./data/authProvider";
import { IoMdClose } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";

const SideBar = () => {
  const pathname = usePathname();

  const { activeMenu, setactiveMenu, screenSize, setscreenSize } = useAuth();

  const handleScreen = () => {
    setscreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreen);
    handleScreen();

    return () => {
      window.removeEventListener("resize", handleScreen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setactiveMenu(false);
    } else {
      setactiveMenu(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize < 900) {
      setactiveMenu(false);
    }
  };

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <div className="w-full h-full py-10 px-7 bg-indigo-400 dark:bg-[#5145cd]">
          <div className="w-full flex justify-end md:hidden text-white font-bold">
            <IoMdClose onClick={handleCloseSidebar} />
          </div>
          <Link
            href="/"
            className=" my-2 flex w-full items-center justify-start gap-3 mx-auto"
          >
            <Image
              alt="logo"
              src="/dumbell.ico"
              width={30}
              height={30}
              className=" rotate-6 w-10 h-10 lg:w-8 lg:h-8"
              priority
            />
            <small className="text-xl font-bold text-black">Lift</small>
          </Link>
          <div className="my-20 flex flex-col gap-10 text-2xl lg:text-lg items-start">
            <Link
              href="/home"
              className={`flex items-center gap-2 ${
                pathname === "/home" ? "text-white" : "text-black"
              }`}
            >
              <TiHomeOutline /> <span className="text-sm">Home</span>
            </Link>
            <Link
              href="/home/live-session"
              className={`flex items-center gap-2 ${
                pathname.includes("/live-session") ? "text-white" : "text-black"
              }`}
            >
              <RiLiveLine /> <span className="text-sm">Live Session</span>
            </Link>
            <Link
              href="/home/diet"
              className={`flex items-center gap-2 ${
                pathname.includes("/diet") ? "text-white" : "text-black"
              }`}
            >
              <PiBowlFoodLight /> <span className="text-sm">Diet Plan</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
