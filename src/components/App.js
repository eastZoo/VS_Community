import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 로그아웃 상태 확인 화면전환
  // user은 콘솔 찍어보면 나올꺼야
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "확인중입니다 손님!!.."}
      <footer>&copy; {new Date().getFullYear()} react-twitter</footer>
    </>
    
  );
} 

export default App;
