/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import DietCard from "@/components/DietCard";
import { PiBowlFoodLight } from "react-icons/pi";
import { db } from "@/components/data/firebase";
import { useAuth } from "@/components/data/authProvider";
import { ref, get, child } from "firebase/database";
import { useRouter } from "next/navigation";
import AddDiet from "@/components/AddDiet";

const Diet = () => {
  const [add, setAdd] = useState(false);
  const [diets, setDiets] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const fetchUserData = async (userId) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${user?.uid}/diets`));
      if (snapshot.exists()) {
        setDiets(
          Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }))
        );
      } else {
        setDiets([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, add]);

  const openModal = () => {
    setAdd(true);
  };

  const closeModal = () => {
    setAdd(false);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full justify-end">
        <button
          onClick={openModal}
          className="bg-[#5145cd] dark:bg-indigo-500 py-2 rounded-md px-4 text-sm text-white"
        >
          Add Diet
        </button>
      </div>
      <div className="w-full ">
        {diets.length === 0 ? (
          <div className="w-1/2 text-lg text-gray-400 flex flex-col gap-5 items-center mx-auto text-center">
            <PiBowlFoodLight size={40} />
            <span>No Diet available, Add Diets display Diets here</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
            {diets.map((diet, index) => (
              <DietCard key={index} diet={diet} fetch={fetchUserData} />
            ))}
          </div>
        )}
      </div>

      {add && <AddDiet id={user.uid} closeModal={closeModal} />}
    </div>
  );
};

export default Diet;
