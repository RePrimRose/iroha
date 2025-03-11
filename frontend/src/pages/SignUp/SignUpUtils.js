import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

{/* ID 유효성 검증 */}
const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(id)) {
        return "ID는 영문자와 숫자만 입력 가능합니다.";
    }
    if (id.length < 5 || id.length > 20) {
        return "ID는 5~20자로 입력해야 합니다.";
    }
    return null;
};

export const handleIdCheck = async (username, setIdChecked, setIsIdChecked, setIdMessage) => {
    const message = validateId(username);

    setIsIdChecked(true);

    if(message != null) {
        setIdMessage(message);
        setIdChecked(true);
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/id-check`,
            {
                userid: username
            });
        if(response.data.exists) {
            setIdMessage("중복된 아이디가 있습니다.")
            setIdChecked(true);
        } else {
            setIdChecked(false);
        }
    } catch (error) {
        console.error(error);
    }
};

{/* 닉네임 유효성 검증 */}
export const handleNicknameCheck = async (username, setNicknameChecked, setIsNicknameChecked) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/name-check`,
            {
                username: username
            })
        if(!response.data.exists) {
            setNicknameChecked(false);
        } else {
            setNicknameChecked(true);
        }
        setIsNicknameChecked(true);
    } catch (error) {
        console.error(error);
    }
};

{/* 비밀번호와 비밀번호 확인 체크 */}
export const checkPassword = (e, password, setPasswordChecked) => {
    if(password !== e.target.value) {
        setPasswordChecked(true)
    } else {
        setPasswordChecked(false)
    }
};

{/* 회원가입 제출 */}
export const handleSubmit = async (e, userid, username, password, navigate, idChecked, idMessage, nicknameChecked, passwordChecked, isNicknameChecked, isIdChecked) => {
    e.preventDefault();

    if (idChecked) {
        return alert(idMessage);
    }
    if (!isIdChecked) {
        return alert("아이디 체크를 해야합니다.");
    }
    if (nicknameChecked) {
        return alert("중복된 닉네임이 있습니다.");
    }
    if (passwordChecked) {
        return alert("비밀번호가 다릅니다.");
    }
    if (!isNicknameChecked) {
        return alert("닉네임 중복 확인을 해야합니다.");
    }


    try {
        const response = await axios.post(`${API_BASE_URL}/users`, {
            userid: userid,
            username: username,
            password: password
        });

        navigate("/login");
    } catch (error) {
        console.log(error);
    }
};
