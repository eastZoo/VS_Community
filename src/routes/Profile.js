import { authService, dbService } from "myBase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
     
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
    };

    // query handling example
    // const getMyNweets = async () => {
    //     //3. 트윗 불러오기
    //     //3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    //     const q = query(
    //         collection(dbService, "nweets"),
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "desc")
    //     );

    //     //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     });
    // };
    // useEffect(() => {
    //     getMyNweets();
    // }, []);
    return(
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange} 
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName}
                />
                <input type="submit" value="프로필 업데이트" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;