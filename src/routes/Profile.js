import { authService, dbService } from "myBase";
import { collection, getxaDocs, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
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
            await updateProfile(authService.currentUser, { 
                displayName: newDisplayName 
            });
            refreshUser();
        }
    };

    // query handling example
    // const getMyNweets = async () => {
    //     //3. 트윗 불러오기
    //     //3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    //     const q = query(
    //         collection(dbService, "newTweets"),
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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="프로필 수정"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                로그아웃
            </span>
        </div>
    );
}

export default Profile;