import { useState, forwardRef, useImperativeHandle } from "react"
import Button from "./Button"

const Blog = forwardRef(({blog}, refs) => {
  const [visible, setVisible] = useState(true)

  let displayVar = visible ? '' : 'none'
  let buttonText = visible ? 'hide' : 'show'
  
  const toggleVisibility = () => {
    setVisible(!visible)
  } 

  useImperativeHandle(refs, () => {
    return {
        toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  
  if(blog.user)
  return(
    <div style={blogStyle}>
      {blog.title} - {blog.author} <Button handleClick={toggleVisibility} text={buttonText}/>
      <p style={{display: displayVar}}>link: {blog.url}</p>
      <p style={{display: displayVar}}>likes: {blog.likes}</p>
      <p style={{display: displayVar}}>{blog.user.name}</p>
    </div>
  )
  else
    return null
})


export default Blog