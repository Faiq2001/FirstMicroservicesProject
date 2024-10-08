import React, { useState } from 'react';
import axios from "axios";

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        }).then(response => {
            setContent('');
        }).catch(error=> {console.log("Unable to create the comment")});

        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
)};

export default CommentCreate;