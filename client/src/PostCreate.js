import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {

    const [title, setTitle] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        axios.post('http://posts.com/posts/create', {
            title,
        }).then(response => {
            setTitle('');
        }).catch (error => {console.log("Unable to create the post")});
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-control" 
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
)};

export default PostCreate;