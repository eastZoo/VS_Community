import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEamil] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onChange = (event) => {
        const {target: {name, value},
        } = event;
        if (name == "email") {
            setEamil(value);
        } else if ( name === "password" ) {
            setPassword(value); 
        }
    };

    const onSubmit = async(event) => {
        // submit 했을때 기본적으로 일어나는 페이지 새로고침 방지
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount){
                //create account
                await createUserWithEmailAndPassword(
                    auth ,email, password
                    );
            } else {
                // log in
                await signInWithEmailAndPassword(
                    auth, email, password
                    );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input 
                    type="submit" 
                    className="authInput authSubmit"
                    value={newAccount ? "회원가입" : "로그인"}
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "로그인" : "회원가입"}
            </span>
        </>
        
    );
};

export default AuthForm;