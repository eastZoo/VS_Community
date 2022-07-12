import {addDoc, collection, getDocs } from "firebase/firestore"
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [newTweet, setNewTweet] = useState("");
    const [newTweets, setNewTweets] = useState([]);


    const getNewTweets = async () => {
        const newDbTweets = await getDocs(collection(dbService, "newTweets"));
        newDbTweets.forEach((document) => {
            const nweetObject = { 
                ...document.data(), 
                id: document.id 
            };
            console.log(document.data());
            setNewTweets((prev) => [nweetObject, ...prev]);
        });    
    };

    useEffect(() => {
        getNewTweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // 컬랙션 생성 함수 사용법, 
        await addDoc(collection(dbService, "newTweets"), {
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
                <input
                value={newTweet} 
                onChange={onChange} 
                type="text" 
                placeholder="너의 새로운 생각을 보여줘." 
                maxLength={120}
                />
                <input type="submit" value="트윗!"/>
            </form>
            <div>
                {newTweets.map((newTweet) => (
                    <div key={newTweet.id}>
                        <h4>{newTweet.text}</h4>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home;