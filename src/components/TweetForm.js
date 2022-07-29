import React, {useState} from "react";
import {addDoc, collection } from "firebase/firestore"
import { dbService, storageService } from "myBase";
import { ref, uploadString, getDownloadURL  } from "@firebase/storage";
// 사진에 랜덤 이름을 주기 위한 라이브러리
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetForm = ({ userObj }) => {
    const [newTweet, setNewTweet] = useState("");
    const [image, setImage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (newTweet === "") {
            return;
          }
        // let을 통해 사진 업로드 없을때 공백 들어가게 뮤터블
        let imageUrl = ""
        if(image !== ""){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, image, "data_url");
            //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
            imageUrl = await getDownloadURL(response.ref);
        }
    
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

    const onClearImage = () => setImage("");
    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={newTweet}
                    onChange={onChange}
                    type="text"
                    placeholder="당신의 생각은 무엇인가요?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>사진 추가</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }} />
            {image && (
                <div className="factoryForm__attachment">
                    <img
                        src={image}
                        style={{
                            backgroundImage: image,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearImage}>
                        <span>삭제</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default TweetForm;