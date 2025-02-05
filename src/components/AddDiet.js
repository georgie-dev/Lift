import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { db } from "./data/firebase";
import { ref, push } from "firebase/database";

const AddDiet = ({ id, closeModal }) => {
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    push(ref(db, "users/" + id + "/diets"), input)
      .then(() => {
        closeModal()
      })
      .catch((error) => {
        console.error("Error writing user data to the database:", error);
      });
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto mx-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg">
          <div className="flex items-center w-full justify-between">
            <header className="font-semibold text-xl">Add</header>
            <MdOutlineCancel onClick={closeModal} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" grid grid-cols-2 shadow-inner gap-2 my-5 rounded-sm p-4">
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">Diet Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Enter Value"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={input.description || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Describe the diet"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={input.startDate || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Enter Value"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={input.endDate || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Enter Value"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">Current Weight (in KG)</label>
                <input
                  type="number"
                  name="currentWeight"
                  value={input.currentWeight || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Enter Value"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="text-sm font-semibold">Target Weight (in KG)</label>
                <input
                  type="number"
                  name="targetWeight"
                  value={input.targetWeight || ""}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
                  placeholder="Enter Value"
                />
              </div>
            </div>
            <div className="w-fit flex gap-5 items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5145cd] text-white text-sm rounded-md px-4 py-2 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {/* {isLoading ? (
                  <PulseLoader
                    color="#FFFFFF"
                    loading={isLoading}
                    height={5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Save"
                )} */}
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiet;
