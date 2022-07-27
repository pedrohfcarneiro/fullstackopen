import axios from 'axios'
const baseUrl = '/api/users'

const getUserFromUsername = async (username) => {
    const response = await axios.get(`${baseUrl}/getByUsername/${username}`)
    return response.data
}

export default { getUserFromUsername }