const NewTweetProfile = ({ userObj }) => {

    return (
        <div className="nweet__profile">
            <img src="./userProfile.png" width="26px" height="26px"></img>
            <span>{userObj.displayName}</span>
        </div>
    )
};

export default NewTweetProfile;