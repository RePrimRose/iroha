import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupSection = () => {
  const [idChecked, setIdChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        userid: userid,
        username: username,
        password: password
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIdCheck = () => {
    // 중복 확인 로직 추가
    alert('ID 중복 확인!');
    setIdChecked(true);
  };

  const handleNicknameCheck = () => {
    // 중복 확인 로직 추가
    alert('닉네임 중복 확인!');
    setNicknameChecked(true);
  };

  return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-md bg-white shadow-lg rounded-lg p-8">
          {/* 섹션 제목 */}
          <h2 className="text-2xl font-bold text-traditionalBlue text-center mb-8">
            회원가입
          </h2>

          {/* ID 입력 및 중복 확인 */}
          <div className="mb-4">
            <label
                htmlFor="id"
                className="block text-gray-700 font-medium mb-2 text-left"
            >
              아이디
            </label>
            <div className="flex items-center space-x-4">
              <input
                  type="text"
                  id="id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="아이디를 입력하세요"
                  onChange={(e) => setUserid(e.target.value)}
              />
            </div>
            {idChecked && (
                <p className="text-green-600 text-sm mt-2">사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4 flex-col">
            <div className="mb-4">
              <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2 text-left"
              >
                비밀번호
              </label>
              <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="passwordcheck"
                  className="block text-gray-700 font-medium mb-2 text-left"
              >
                비밀번호 확인
              </label>
              <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="비밀번호를 한번 더 입력하세요"
              />
            </div>
          </div>

          {/* 닉네임 입력 및 중복 확인 */}
          <div className="mb-4">
            <label
                htmlFor="nickname"
                className="block text-gray-700 font-medium mb-2 text-left"
            >
              닉네임
            </label>
            <div className="flex items-center space-x-4">
              <input
                  type="text"
                  id="nickname"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="닉네임을 입력하세요"
                  onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {nicknameChecked && (
                <p className="text-green-600 text-sm mt-2">사용 가능한 닉네임입니다.</p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-traditionalBlue text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            회원가입
          </button>
        </div>
      </section>
  );
};

export default SignupSection;
