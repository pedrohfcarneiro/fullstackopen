import React from "react";
import Button from "./Button";
import { useState } from "react";

const NewBlogForm = ({handleCreateBlog}) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const addBlog = (event) => {
        event.preventDefault()
        handleCreateBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }
    
    return(
        <div>
            <h1>Create New Blog Post</h1>
            <div>
                Title: 
                <input type='text' value={newBlog.title} name='Title' onChange={({target}) => setNewBlog({...newBlog, title: target.value})}></input>
            </div>
            <div>
                Author: 
                <input type='text' value={newBlog.author} name='Author' onChange={({target}) => setNewBlog({...newBlog, author: target.value})}></input>
            </div>
            <div>
                Url: 
                <input type='text' value={newBlog.url} name='Url' onChange={({target}) => setNewBlog({...newBlog, url: target.value})}></input>
            </div>
            <Button handleClick={addBlog} text='create'/>
        </div>
    )
}
export default NewBlogForm