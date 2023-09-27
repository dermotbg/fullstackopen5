import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  // add likes state to add/subtract per load, can be added twice on page reload but not writing liked user data to db
  const [likes, setLikes] = useState(blog.likes)
    
  const showWhenVisible = { display: visible ? '' : 'none' }
  const user = JSON.parse(window.localStorage.getItem('loggedInAppUser'))

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const likeHandler = async (event) => {
    event.preventDefault()
    const blogObj = {
      user: blog.user.id,
      likes: likes === blog.likes ? blog.likes + 1 : likes - 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    try {
      await blogService.like(blogObj)
      likes === blog.likes ? setLikes(blog.likes + 1) : setLikes(likes -1)
    }
    catch (exception){
      console.log(exception)
    }
  }
  
const deleteHandler = async (event) => {
  event.preventDefault()

  console.log('blog user',blog.user.username)
  console.log('user.id',user.username)

  if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) && blog.user.username === user.username){
    blog.token = user.token
    try {
      blogService.deleteBlog(blog)
      alert('Blog deleted')
    }
    catch(exception){
      console.log(exception);
    }
  }
  else{
    alert('blog not deleted, unauthorized user')
  }
}
  return (
    <div className="blogStyle">
        <div>
          {blog.title} by {blog.author} 
          <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
        </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes:  {likes} <button onClick={likeHandler}>{ likes === blog.likes ? 'like' : 'unlike' }</button>
        </div>
        <div>
          {blog.user.name ? blog.user.name : user.name}
        </div>
        {blog.user.username === user.username ? <button onClick={deleteHandler}>delete</button> : null}
      </div>
    </div>
  ) 
}

export default Blog