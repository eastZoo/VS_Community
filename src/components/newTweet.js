import React from "react";
import { doc, deleteDoc } from "firebase/firestore"
import { dbService } from "myBase";

const NewTweet = ({ newTweetObj, isOwner }) => {
    const onDeleteClick = async() => {
        const ok = window.confirm("진짜 삭제하실거에요??");
        console.log(ok);
        if (ok) {
            //delete tweet
            await deleteDoc(delTweet);
        }
    };

    const delTweet = doc(dbService, `newTweets/${newTweetObj.id}`)

    return(
        <div>
            <h4>{newTweetObj.text}</h4>
            {isOwner && (
                // isOwner로 넘어온 값이 True일때 === 내가 쓴 글일 때만 버튼 보이기
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button>Edit</button>
                </>
            )}
            
        </div>
    );
};

export default NewTweet;