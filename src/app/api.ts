const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export async function getJobs({ pageIndex = 0, pageSize = 100, filter, order}: {pageIndex: any, pageSize: any, filter: any, order: any}) {
    const search = filter ? `&search=${filter}` : ''
    order = order ? camelToSnakeCase(order) : ''
    const response = await fetch(`${baseUrl}/jobs/?limit=${pageSize}&offset=${pageIndex}${search}&ordering=${order}`)
    return response.json()
}
export async function getJob(jobId) {
    const response = await fetch(`${baseUrl}/jobs/${jobId}`)
    return response.json()
}