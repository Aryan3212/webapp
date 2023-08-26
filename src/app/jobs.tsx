'use client'
import { columns } from "@/app/job-columns";
import { DataTable } from "@/components/ui/data-table";

import { useQuery } from '@tanstack/react-query'
import { getJobs } from "@/app/api";
import { Skeleton } from "@/components/ui/skeleton";

export const Jobs = () => {

  const { data, isSuccess } = useQuery({ queryKey: ['jobs'], queryFn: getJobs })
  return (
    <div className="mx-auto">
      {
        !isSuccess ? <Skeleton className="h-[100px] w-full" /> :
          <DataTable columns={columns} data={data.results} />
      }
    </div>
  );
};
