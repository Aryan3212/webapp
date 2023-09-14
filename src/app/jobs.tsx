'use client'
import { columns } from "@/app/job-columns";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";

import React from "react";
import { getJob } from "./api";

export const Jobs = () => {
  const searchParams = useSearchParams()
  const jobId = parseInt(searchParams.get('job_id'))
  const [job, setJob] = React.useState<any>(null)
  React.useEffect(() => {
    if(!jobId) return
    const response = getJob(jobId)
    setJob(response)
  }, [])
  return (
    <div className="mx-auto">
      <DataTable columns={columns} showJobDetails={job}/>
    </div>
  );
};
