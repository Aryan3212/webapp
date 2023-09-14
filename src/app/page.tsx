import { Jobs } from '@/app/jobs'
import { getJob } from "@/app/api";

import { Metadata } from 'next';
import { CursorArrowIcon } from '@radix-ui/react-icons';

export type Job = {
  id: string
  title: string
  description: string
  dateAdded: string
  applicationUrl?: string
  applicationEmail?: string
  companyName: string
  minimumExperience: string
  location: string
}

export default async function Home() {
  return (
    <main className="container min-h-screen p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        WorkList
      </h1>
      <h2 className="scroll-m-10  border-b mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Find work that fulfills.
      </h2>
      <p className='mb-4'><CursorArrowIcon width={20} height={20} className='inline'/> Click on the job listing to start applying.</p>
      <Jobs />
    </main>
  )
}
 
type MetadataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
 
export async function generateMetadata(
  { searchParams }: MetadataProps,
): Promise<Metadata> {
  const jobId = searchParams.job_id;
  if(jobId){
    const job = await getJob(jobId);
    return {
      openGraph: {
        title: job.title + ' | ' + job.companyName,
        description: `Find more jobs like ${job.title} at Worklist!`,
        url: '/?job_id=' + jobId,
      },
      twitter: {
        card: 'summary_large_image',
        title: job.title + ' | ' + job.companyName,
        description: `Find more jobs like ${job.title} at Worklist!`,
      },
    };
  }
  return {};
}