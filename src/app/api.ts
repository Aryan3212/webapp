
export async function getJobs() {
    const response = await fetch('http://127.0.0.1:8000/jobs/')
    return response.json()
}