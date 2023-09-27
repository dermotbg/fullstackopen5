import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log(exception)
      setIsError(true)
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInAppUser')
    setUser(null)
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const response = await blogService.create(blogObj)
      console.log(response)
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setErrorMessage(`A New Blog: ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception){
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} error={isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text"
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password"
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)} />
          </div>
          <button type='Submit'>Login</button>
        </form>
      </div>
  )}
  return (
    <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} error={isError} />
        <p>{user.name} logged in 
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='create note'>
          <h2>create new</h2>
            <form onSubmit={addBlog}>
              <div>title:<input value={newTitle} onChange={handleTitleChange} /></div>
              <div>author:<input value={newAuthor} onChange={handleAuthorChange} /></div>
              <div>url:<input value={newUrl} onChange={handleUrlChange} /></div>
              <button type="submit" >create</button>
            </form> 
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
    </div>
  )
}

export default App