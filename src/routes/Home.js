import {addDoc, collection } from "firebase/firestore"
import { dbService } from "myBase";
import React, { useState } from "react";

const Home = () => {
    const [newTweet, setNewTweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        // 컬랙션 생성 함수 사용법, 
        await addDoc(collection(dbService, "newTweet"), {
            text: newTweet,
            createdAt: Date.now(),
          });
        setNewTweet("");
    };
    const onChange = (event) => {
        const { target: { value },
    } = event;
    setNewTweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={newTweet} onChange={onChange} type="text" placeholder="너의 새로운 생각을 보여줘." maxLength={120}/>
                <input type="submit" value="트윗!"/>
            </form>
        </div>
    )
}

export default Home;