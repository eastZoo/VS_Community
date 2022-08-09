import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import wakMain from "../image/wakMain.png";
import wakProfile from "../image/wakProfile.png";
import wakNotice from "../image/wakNotice.png";

const Navigation = ({ userObj }) => {

    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50, marginBottom: 40 }}>
                <li>
                    <Link to="/" style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}>
                        <img src={wakMain} width="26px" height="26px" />
                        <span style={{ marginTop: 10 }}>
                            Main
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        style={{
                            marginLeft: 33,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        <img src={wakProfile} width="26px" height="26px" />
                        <span style={{ marginTop: 10 }}>
                            {userObj.displayName
                                ? `${userObj.displayName}의 프로필`
                                : "프로필"}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/notice"
                        style={{
                            marginLeft: 33,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        <img src={wakNotice} width="26px" height="26px" />
                        <span style={{ marginTop: 10 }}>
                            사용법
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;