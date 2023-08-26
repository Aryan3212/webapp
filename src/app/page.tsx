import { columns } from "@/app/job-columns"
import { DataTable } from "@/components/ui/data-table"

type Job = {
  id: string
  title: string
  description: string
  dateAdded: string
  applicationLink: string
}

 
export const jobs: Job[] = [
  {
    id: "728ed52f",
    title: 'Software Engineer',
    description: 'We are looking for a software engineer to join our team.',
    dateAdded: '2023-08-01',
    applicationLink: 'https://www.google.com',
  },
  {
    id: "489e1d42",
    title: 'Software Engineer 2',
    description: 'We are looking for a software engineer to join our team.',
    dateAdded: '2021-08-19',
    applicationLink: 'https://www.google.com',
  },
]

async function getData(): Promise<Job[]> {
  // Fetch data from your API here.
  return jobs;
}


export default async function Home() {
  const data = await getData()

  return (
    <main className="container min-h-screen p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        WorkList
      </h1>
      <h2 className="scroll-m-10 mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Find work that fulfills.
      </h2>
      <div className="mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}
