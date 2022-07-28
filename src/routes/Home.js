import NewTweet from "components/newTweet";
import {addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [newTweet, setNewTweet] = useState("");
    const [newTweets, setNewTweets] = useState([]);
    const [image, setImage] = useState();

    // 데이터 가져와서 보여주기
    // getNewTweet을 사용하지 않고 파베 snapshot 기능을 통해 실시간으로 채팅 업로드 re-render 적게
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
        console.log(newTweetArr);
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
    // 사진 파일 저장 읽어오는 로직
    const onFileChange = (event) => {
        // console.log(e.target.files);
        // event안에서 target 안으로 가서 파일을 받아오는 것을 의미
        const {
            target : {files },
        } = event;
        // files 안에 있는 파일중 첫번째 파일만 가져온다 ( 많이 가져올 수 있음  )
        const theFile = files[0];
        // console.log(theFile);
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const { 
                currentTarget : {result}, 
            } = finishedEvent;
            setImage(result);
        };
        reader.readAsDataURL(theFile);
    }
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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="트윗!"/>
                {image && <img src={image} width="50px" height="50px" />}
            </form>
            <div>
                {newTweets.map((newTweet) => (
                    // 컴포넌트로 모듈화, userObj는 Home의 props
                    <NewTweet key={newTweet.id} newTweetObj={newTweet} isOwner={newTweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;