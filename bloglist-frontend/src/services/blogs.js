import axios from 'axios'
import userService from './users'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getBlogsByUsername = async (username) => {
  const config = {
    headers: { Authorization: token }
  }
  const userToGetBlogs = await userService.getUserFromUsername(username)
  console.log(userToGetBlogs)
  const response = await axios.get(`${baseUrl}/ByUserId/${userToGetBlogs.id}`, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, createBlog, setToken, getBlogsByUsername }