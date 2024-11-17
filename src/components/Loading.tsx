import { Skeleton } from "./ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center mt-20">
      <div className='flex space-x-4 items-end'>
        <Skeleton className="w-[30px] h-[30px] rounded-xl" />
        <Skeleton className="w-[30px] h-[70px] rounded-xl" />
        <Skeleton className="w-[30px] h-[120px] rounded-xl" />
        <Skeleton className="w-[30px] h-[200px] rounded-xl" />
        <Skeleton className="w-[30px] h-[90px] rounded-xl" />
        <Skeleton className="w-[30px] h-[50px] rounded-xl" />
      </div>
    </div>
  )
}