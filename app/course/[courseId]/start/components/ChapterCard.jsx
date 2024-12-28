import { Clock } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function CourseCurriculum({ chapter, index }) {
  return (
   <div className='grid grid-cols-5 p-3 items-center border-b border-r'>
    <div>
        <h2 className='p-1 bg-purple-500 w-8 h-8 text-white rounded-full text-center'>
            {index+1}     
        </h2>
    </div>
    <div className='col-span-4'>
     <h2 className='col-span-4'>
        {chapter?.chapterName}
     </h2>
     <h2 className='flex items-center gap-2 text-sm text-purple-500'>
        <Clock />
        {chapter?.duration}
     </h2>
    </div>

   </div>
  );
}
