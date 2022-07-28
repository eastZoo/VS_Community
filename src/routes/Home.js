import NewTweet from "components/newTweet";
import {addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { ref, uploadString, getDownloadURL  } from "@firebase/storage";
// 사진에 랜덤 이름을 주기 위한 라이브러리
import { v4 as uuidv4 } from 'uuid';

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
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, image, "data_url");
        //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
        const imageUrl = await getDownloadURL(response.ref);
        const newTweetObj = {
            text: newTweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl
        }
        await addDoc(collection(dbService, "newTweets"), newTweetObj);
        // 업로드할때 아래 set함수들이 아무것도 하지 않는다 ""
        //state 비워서 form 비우기
        setNewTweet("");
        //파일 미리보기 img src 비워주기
        setImage("");
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

    const onClearImage = () => setImage(null);
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
                {image && (
                    <div>
                        <img src={image} width="50px" height="50px" />
                        <button onClick={onClearImage}>삭제</button>
                    </div>
                )}
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