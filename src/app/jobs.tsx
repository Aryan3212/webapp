'use client'
import { columns } from "@/app/job-columns";
import { DataTable } from "@/components/ui/data-table";

import { useQuery } from '@tanstack/react-query'
import { getJobs } from "@/app/api";

export const Jobs = () => {

  const { data } = useQuery({ queryKey: ['jobs'], queryFn: getJobs })
  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data.results} />
    </div>
  );
};
