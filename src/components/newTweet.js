import React from "react";

const newTweet = ({ newTweetObj }) => {
    return(
        <div>
            <h4>{newTweetObj.text}</h4>
        </div>
    );
};

export default newTweet;