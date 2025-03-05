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

export const handleIdCheck = async (e, idTimer, setUserid, setIdChecked, setIdMessage) => {
    const value = e.target.value;
    setUserid(value);

    const message = validateId(value);

    if(message != null) {
        setIdMessage(message);
        setIdChecked(true);
        return;
    }

    if(idTimer) {
        clearTimeout(idTimer);
    }

    idTimer = setTimeout(async () => {
        if(value) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/id-check`,
                    {
                        userid: value
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
        }
    }, 500);
};

{/* 비밀번호 유효성 검증 */}
export const handleNicknameCheck = async (e, nameTimer, setUsername, setNicknameChecked) => {
    const value = e.target.value;
    setUsername(value);

    clearTimeout(nameTimer);

    nameTimer = setTimeout(async () => {
        if(value) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/name-check`,
                    {
                        username: value
                    })
                if(!response.data.exists) {
                    setNicknameChecked(true)
                } else {
                    setNicknameChecked(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, 500);
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
export const handleSubmit = async (e, userid, username, password, navigate) => {
    e.preventDefault();

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
