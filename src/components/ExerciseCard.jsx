/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iQHF8yLoUNb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "./data/authProvider"
import { deleteWorkout } from "./deleteExercise"

export default function ExerciseCard({workout, fetch}) {
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const {user} = useAuth()

  useEffect(() => {
    if(workout){
      setCountdown(workout?.duration * 60)
    }
  }, [workout])
  
  const handleStartClick = () => {
    setIsCountdownActive(!isCountdownActive)
  }
  const handleDelete = async (workoutId) => {
    if (!user) return;

    await deleteWorkout(user?.uid, workoutId);
    fetch();
  };

  useEffect(() => {
    let countdownInterval
    if (isCountdownActive) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => {
      clearInterval(countdownInterval)
    }
  }, [isCountdownActive])
  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [countdown])
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{workout?.muscle} Workout</CardTitle>
        <CardDescription>{workout?.exercise}</CardDescription>
        <div className="text-sm text-gray-500 dark:text-gray-400">{workout?.date}</div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DumbbellIcon className="h-5 w-5 text-primary" />
            <span>{workout?.muscle}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-muted" />
            <span>{formattedCountdown}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted">Sets</div>
            <div className="font-medium">{workout?.sets}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted">Reps</div>
            <div className="font-medium">{workout?.reps}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted">Weight</div>
            <div className="font-medium">{workout?.weights} kg</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-5 items-center justify-between">
      <Button variant="destructive" onClick={()=> handleDelete(workout.id)}>
          <TrashIcon className="h-5 w-5 mr-2" />
          Delete
        </Button>
        <Button onClick={handleStartClick}>
          <PlayIcon className="h-5 w-5 mr-2" />
          {isCountdownActive ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}