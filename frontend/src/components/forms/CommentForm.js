import React, { useState } from "react";
import { Input } from "./FormElement";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { GrSend } from "react-icons/gr";


const CommentForm = ({onCommentSubmit}) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        onCommentSubmit(comment)
        setComment('')
    };

    return (
        <form onSubmit={handleSubmit}>
           <Input 
                name="comment"
                type="text"
                value={comment}
                placeholder="Write a reply..." 
                onChange={e => setComment(e.target.value)}
            />
           <div>
                <MdOutlineEmojiEmotions style={{marginRight: ".5em"}} />
                <FiAtSign />
                <button type="submit" style={{float:"right", background: "none", marginTop:"-0.3em"}} ><GrSend style={{color:"black", fontSize:"1em", }} /></button>
           </div>
        </form>
    )
}

export default CommentForm;