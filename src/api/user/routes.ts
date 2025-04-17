class UserAPI {
  async createUser(id: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, jobs: [] }),
    })

    if (!response.ok) {
      throw new Error(`User API Error : ${response.statusText}`)
    }
  }

}

export const userAPI = new UserAPI()