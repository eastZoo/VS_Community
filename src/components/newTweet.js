import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { dbService } from "myBase";

const NewTweet = ({ newTweetObj, isOwner }) => {
    //편집 모드인지 아니지 알려주는 editing
    const [editing, setEditing] = useState(false);
    //input에 입력된 text 업데이트 역할 newTweet
    const [newTweet, setNewTweet] = useState(newTweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("진짜 삭제하실거에요??");
        console.log(ok);
        if (ok) {
            //delete tweet
            await deleteDoc(NweetTextRef);
        }
    };
    const NweetTextRef = doc(dbService, "newTweets", `${newTweetObj.id}`);

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(newTweetObj, newTweet);
        await updateDoc(NweetTextRef, { text: newTweet });
        // 편집 update 후 편집모드 종료 false
        setEditing(false)
    }
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewTweet(value);
    };
    return(
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="글 수정하기" value={newTweet} required onChange={onChange}/>
                        <input type="submit" value="전송"/>
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
                    <h4>{newTweetObj.text}</h4>
                    {isOwner && (
                        // isOwner로 넘어온 값이 True일때 === 내가 쓴 글일 때만 버튼 보이기
                        <>
                            <button onClick={onDeleteClick}>삭제</button>
                            <button onClick={toggleEditing}>편집</button>
                        </>
                    )}
                </>
            )}
            
        </div>
    );
};

export default NewTweet;