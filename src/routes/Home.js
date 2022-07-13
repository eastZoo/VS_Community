import {addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [newTweet, setNewTweet] = useState("");
    const [newTweets, setNewTweets] = useState([]);

    console.log(userObj);
    const getNewTweets = async () => {
        const newDbTweets = await getDocs(collection(dbService, "newTweets"));
        newDbTweets.forEach((document) => {
            const nweetObject = { 
                ...document.data(), 
                id: document.id,
            };
            setNewTweets((prev) => [nweetObject, ...prev]);
        });    
    };
    
    // 데이터 가져와서 보여주기
    useEffect(() => {
        const q = query(
        collection(dbService, "newTweets"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const newTweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }
        ));
        console.log("뭔가 일이 일어났어요")
        setNewTweets(newTweetArr);
        });
    }, []);
        
    const onSubmit = async (event) => {
        event.preventDefault();

        // 컬랙션 생성 함수 사용법, 
        await addDoc(collection(dbService, "newTweets"), {
            text: newTweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
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