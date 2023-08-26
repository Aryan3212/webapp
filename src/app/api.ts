const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getJobs() {
    const response = await fetch(`${baseUrl}/jobs/`)
    return response.json()
}