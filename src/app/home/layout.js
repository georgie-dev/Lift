"use client";
import { useAuth } from "@/components/data/authProvider";
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const { activeMenu } = useAuth();
  return (
    <main className=" flex gap-0">
      <section className={activeMenu ? "w-48 lg:w-72 fixed z-50 " : "w-0"}>
        <Sidebar />
      </section>
      <section className={`${activeMenu ? "md:ml-48 lg:ml-72" : "m-0"} w-full`}>
        <Navbar />
        <div className="py-3 px-5">{children}</div>
      </section>
    </main>
  );
}
