'use client'
import { columns } from "@/app/job-columns";
import { DataTable } from "@/components/ui/data-table";

import { useQuery } from '@tanstack/react-query'
import { getJobs } from "@/app/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { ShadowInnerIcon } from "@radix-ui/react-icons";

export const Jobs = () => {

  const { data, isSuccess } = useQuery(
    { queryKey: ['jobs'], queryFn: getJobs, refetchInterval: 10000 }
    )
  const searchParams = useSearchParams()
  const jobId = parseInt(searchParams.get('job_id'))
  return (
    <div className="mx-auto">
      {
        !isSuccess ?
          <Skeleton className="h-[100px] w-full flex justify-center items-center">
            <ShadowInnerIcon width={20} height={20} className=""/>
          </Skeleton>
           :
          <DataTable columns={columns} data={data.results} openRowById={jobId}/>
      }
    </div>
  );
};
