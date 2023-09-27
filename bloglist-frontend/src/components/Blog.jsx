import { useState } from "react"
import likeService from '../services/like'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
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
      await likeService.like(blogObj)
      likes === blog.likes ? setLikes(blog.likes + 1) : setLikes(likes -1)
    }
    catch (exception){
      console.log(exception)
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
      </div>
    </div>
  ) 
}

export default Blog