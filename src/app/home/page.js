/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/data/authProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { db } from "@/components/data/firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import AddExercise from "@/components/AddExercise";
import { CgGym } from "react-icons/cg";
import ExerciseCard from "@/components/ExerciseCard";
import { Calender } from "@/components/Icons/Icons";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [exerciseDates, setExerciseDates] = useState([]);
  const [add, setAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uniq = [...exerciseDates];
  const formattedDate = startDate ? format(startDate, "yyyy-MM-dd") : "";

  const handleDateChange = (date) => {
    if (date) {
      setStartDate(date);
    } else {
      console.error("Invalid date:", date);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const dbRef = ref(db, "users/" + user?.uid + "/workouts");

      // const snapshot = await get(dbRef);

      const workoutQuery = query(
        dbRef,
        orderByChild("date"),
        equalTo(formattedDate)
      );
      const filteredSnapshot = await get(workoutQuery);

      if (filteredSnapshot.exists()) {
        setExerciseDates(
          Object.entries(filteredSnapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }))
        );
      } else {
        setExerciseDates([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, startDate, add]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const openModal = () => {
    setAdd(true);
  };

  const closeModal = () => {
    setAdd(false);
  };


  const DateButton = ({ value }) => (
    <p className="z-0 select-none py-2 px-4 w-full text-center text-white bg-[#5145cd] dark:bg-indigo-500 text-sm rounded-md shadow">
      {value}
    </p>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-5">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            name="startDate"
            dateFormat="yyyy/MM/dd"
            closeOnScroll={true}
            customInput={<DateButton />}
            highlightDates={uniq?.map((date) => {
              const parsedDate = new Date(date);
              if (!isNaN(parsedDate)) {
                return parsedDate;
              } else {
                console.error("Invalid date in highlightDates:", date);
                return null;
              }
            }).filter(date => date !== null)}
          />
          <DatePicker
            aria-label="Calendar"
            selected={startDate}
            onChange={handleDateChange}
            highlightDates={uniq?.map((date) => {
              const parsedDate = new Date(date);
              if (!isNaN(parsedDate)) {
                return parsedDate;
              } else {
                console.error("Invalid date in highlightDates:", date);
                return null;
              }
            }).filter(date => date !== null)}
            name="startDate"
            dateFormat="MMM dd, yyyy"
            closeOnScroll={true}
            withPortal
            customInput={
              <div className="cursor-pointer text-[#5145cd] dark:hover:bg-[#5145cd]/30 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <Calender />
              </div>
            }
          />
        </div>
        <button
          onClick={openModal}
          className="bg-[#5145cd] dark:bg-indigo-500 py-2 rounded-md px-4 text-sm text-white"
        >
          Add Exercise
        </button>
      </div>
      <div className="w-full ">
        {exerciseDates.length === 0 ? (
          <div className="w-4/5 lg:w-1/2 text-lg text-gray-400 flex flex-col gap-5 items-center mx-auto text-center">
            <CgGym size={40} />
            <span>No Exercise available, Add exercises or Change date to display exercises here</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
            {exerciseDates.map((workout, index) => (
              <ExerciseCard key={index} workout={workout} fetch={fetchUserData} />
            ))}
          </div>
        )}
      </div>
      {add && (
        <AddExercise
          date={formattedDate}
          id={user.uid}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
