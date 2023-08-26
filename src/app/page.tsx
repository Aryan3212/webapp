import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { Jobs } from '@/app/jobs'
import { getJobs } from "@/app/api";
export type Job = {
  id: string
  title: string
  description: string
  dateAdded: string
  applicationUrl: string
  companyName: string
  minimumExperience: string
  location: string
}

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['jobs'], getJobs)
  const dehydratedState = dehydrate(queryClient)


  return (
    <main className="container min-h-screen p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        WorkList
      </h1>
      <h2 className="scroll-m-10 mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Find work that fulfills.
      </h2>
      <p>ℹ️ Click on the job listing to start applying.</p>
      <Hydrate state={dehydratedState}>
        <Jobs />
      </Hydrate>
    </main>
  )
}
