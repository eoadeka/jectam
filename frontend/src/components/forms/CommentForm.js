import React, { useState } from "react";
import { Input } from "./FormElement";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { GrSend } from "react-icons/gr";


const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        setComment(comment)
    };

    return (
        <form onSubmit={handleSubmit}>
           <Input 
                placeholder="Write a reply..." 
                onChange={e => setComment(e.target.value)}
            />
           <div>
                <MdOutlineEmojiEmotions />
                <FiAtSign />
                <GrSend onClick={handleSubmit} />
           </div>
        </form>
    )
}

export default CommentForm;