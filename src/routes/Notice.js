import Example1 from "../image/noticeExample1.png";
const Notice = () => {

    return (
        <div className="notice_wraper">
            <h1 className="notice_title">사용법💁🏻‍♂️</h1>
            <br />
            <span className="notice_text">
                1. 왁튜브를 보다가 재밌었던 동영상의 링크를<br />
                Main화면의 입력창에 복사, 붙여넣기하여 전송한다
            </span>
            <img src={Example1} />
            <span>
                2. 다른 팬치가 공유해놓은 동영상 중<br />
                보지 않았던 동영상이 있다면 재밌게 시청한다!
            </span>
            <br /><br /><br /><br />
            <h1 className="notice_title">프로필 변경☝🏻</h1>
            <span>
                <br /><br />
                1. 소셜 로그인시 닉네임이 마음에 들지 않으면
                oo의 프로필창으로 가서 닉네임을 변경한다
                <br /><br />
                2. 회원가입 후 프로필창으로 가서 빈칸에 닉네임을 입력한다
            </span>
        </div>
    );
};

export default Notice;
