import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 로그인 로그아웃 상태 확인 화면전환
  // user은 콘솔 찍어보면 나올꺼야
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        // 로그인한 user 정보를 받아서 저장해놓는 곳 and 라우터로 전송
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile: (arg) => user.updateProfile(arg),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (arg) => user.updateProfile(arg),
    });
  }
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn} 
          userObj={userObj}/>
        )
        : 
        "확인중입니다 손님!!.."}
      <footer>&copy; {new Date().getFullYear()} react-twitter</footer>
    </>
    
  );
} 

export default App;
