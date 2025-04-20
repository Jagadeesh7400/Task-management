"use client"

import { Skeleton } from "@/components/ui/skeleton"

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <Skeleton className="w-[300px] h-[50px] rounded-full" />
      <Skeleton className="w-[200px] h-[30px] mt-4" />
    </div>
  )
}

export default LoadingScreen
