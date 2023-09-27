import { useState } from "react"
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
    
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
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
          likes:  {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
  ) 
}

export default Blog