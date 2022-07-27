import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'



const Button = ({handleClick, text}) => {
  return(
      <button onClick={handleClick}>
          {text}
      </button>
  )
}



const Blogs = ({blogs}) => (
  <div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>  
)

const LoggedinUserInfo = ({handleClick, text, user}) => (
  <div>
    <span>{user.name} logged-in</span> <Button handleClick={handleClick} text={text} />
  </div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const newBlogFormRef = useRef()
  
  useEffect(() => {
    const loggedUserInJson = window.localStorage.getItem('loggedUser')
    if(loggedUserInJson) {
      const user = JSON.parse(loggedUserInJson)
      setUser(user)
      console.log(user)
      const fetchData = async () => {
        console.log(user)
        const blogsReturned = await blogService.getBlogsByUsername(user.username)
        console.log(blogsReturned)
        setBlogs(blogsReturned)
      }
      fetchData()
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.loginMethod(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setCredentials({
        username: '',
        password: ''
      })
    } catch (error) {
      setNotificationMessage('Wrong Credentials')
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      setUser(null)
    } catch (error) {
      setNotificationMessage('Couldn\'t logout')
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setNotificationMessage('Added new blog.')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage('Failed to create blog')
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} isError={isError}/>

      {user === null ? 
      <Togglable buttonLabel='Log-in'>
        <LoginForm handleLogin={handleLogin} credentials={credentials} setCredentials={setCredentials}/>
      </Togglable>
      : 
      <div>
        <LoggedinUserInfo handleClick={handleLogout} text='logout' user={user}/>
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
          <NewBlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
        <Blogs blogs={blogs}/>
      </div>
      }
    </div>
  )
}

export default App
