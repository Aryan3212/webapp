const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getJobs({ page = 0 , filter}: {page: any, filter: any}) {
    console.log(filter, 'arst')
    const search = filter ? `&search=${filter}` : ''
    const response = await fetch(`${baseUrl}/jobs/?page=${page}${search}`)
    return response.json()
}
export async function getJob(jobId) {
    const response = await fetch(`${baseUrl}/jobs/${jobId}`)
    return response.json()
}