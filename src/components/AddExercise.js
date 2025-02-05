import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { db } from "./data/firebase";
import { ref, push } from "firebase/database";
import { exerciseList } from "./data/data";

const Add = ({ date, id, exercise, muscle, close }) => {
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
    // setIsLoading(true);
    const data = {
      ...input,
      date: date,
      muscle: muscle.muscle,
      exercise: exercise.exercise
    };
    console.log(data);
    push(ref(db, 'users/' + id + '/workouts'), data)
      .then(() => {
        close()
      })
      .catch((error) => {
        console.error('Error writing user data to the database:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className=" grid grid-cols-2 shadow-inner gap-2 my-5 rounded-sm p-4">
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-semibold">Sets</label>
            <input
              type="number"
              name="sets"
              value={input.sets || ""}
              onChange={handleChange}
              className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
              placeholder="Enter Value"
            />
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-semibold">Reps</label>
            <input
              type="number"
              name="reps"
              value={input.reps || ""}
              onChange={handleChange}
              className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
              placeholder="Enter Value"
            />
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-semibold">Weights (in KG)</label>
            <input
              type="number"
              name="weights"
              value={input.weights || ""}
              onChange={handleChange}
              className="p-2 w-full rounded-md border placeholder:text-sm text-black text-sm bg-white"
              placeholder="Enter Value"
            />
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-semibold">Duration (in Mins)</label>
            <input
              type="number"
              name="duration"
              value={input.duration || ""}
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
  );
};

const AddExercise = ({ date, id, closeModal }) => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
    setSelectedExercise(null); // Reset selected exercise when changing muscle
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
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
          {selectedMuscle && selectedExercise === null ? (
            <div className=" flex flex-col gap-2">
              <h2 className="font-semibold">
                <span
                  className="cursor-pointer text-[#5145cd]"
                  onClick={() => {
                    setSelectedMuscle(null);
                  }}
                >
                  {selectedMuscle.muscle} &gt;
                </span>{" "}
                Exercises
              </h2>
              <div className="grid grid-cols-3 gap-4 p-4 border-2 border-black rounded-md">
                {selectedMuscle.exercises.map((exercise) => (
                  <button
                    className="rounded-sm py-2 px-5 text-white bg-[#5145cd]/60"
                    key={exercise.id}
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    {exercise.exercise}
                  </button>
                ))}
              </div>
            </div>
          ) : selectedExercise ? (
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">
                <span
                  className="cursor-pointer text-[#5145cd]"
                  onClick={() => {
                    setSelectedMuscle(null);
                  }}
                >
                  {selectedMuscle.muscle} &gt;
                </span>{" "}
                <span
                  className="cursor-pointer text-[#5145cd]"
                  onClick={() => {
                    setSelectedExercise(null);
                  }}
                >
                  {selectedExercise.exercise} &gt;
                </span>{" "}
                Details
              </h2>
              <Add
                exercise={selectedExercise}
                muscle={selectedMuscle}
                date={date}
                id={id}
                close={closeModal}
              />
            </div>
          ) : (
            <div className=" flex flex-col gap-2">
              <h2 className="font-semibold">Select a Muscle Group:</h2>
              <div className="grid grid-cols-3 gap-4 p-4 border-2 border-black rounded-md">
                {exerciseList.map((muscle) => (
                  <button
                    className="rounded-sm py-2 px-5 text-white bg-[#5145cd]"
                    key={muscle.id}
                    onClick={() => handleMuscleClick(muscle)}
                  >
                    {muscle.muscle}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
