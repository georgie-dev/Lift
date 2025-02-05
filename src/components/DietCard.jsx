import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { deleteDiet } from "./deleteExercise"
import { useAuth } from "./data/authProvider"

export default function DietCard({ diet, fetch }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const currentDate = new Date()
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const elapsedDays = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const progress = Math.min(Math.round((elapsedDays / totalDays) * 100), 100)
  const { user } = useAuth()

  useEffect(() => {
    if (diet) {
      setStartDate(new Date(diet?.startDate))
      setEndDate(new Date(diet?.endDate))
    }
  }, [diet])

  const handleDelete = async (dietId) => {
    if (!user) return;

    await deleteDiet(user?.uid, dietId);
    fetch();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-primary text-primary-foreground px-6 py-4 rounded-t-md">
        <h2 className="text-2xl font-bold">{diet?.name}</h2>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {diet?.description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{progress}% complete</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Start Weight</p>
            <p>{diet?.currentWeight} lbs</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Target Weight</p>
            <p>{diet?.targetWeight} lbs</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-b-md flex justify-end gap-2">
        <Button variant="destructive" size="sm" onClick={() => handleDelete(diet.id)}>
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
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