import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {checkPassword, handleIdCheck, handleNicknameCheck, handleSubmit} from "./SignUpUtils";

const SignupSection = () => {
  const [idChecked, setIdChecked] = useState(false);
  const [idMessage, setIdMessage] = useState("");
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isNicknameChecked, setIsNickNameChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  let idTimer;
  let nameTimer;

  return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-lg bg-white shadow-lg rounded-lg p-10">
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
            <div className="relative items-center space-x-4">
              <input
                  type="text"
                  id="id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="아이디를 입력하세요"
                  onChange={(e) => handleIdCheck(e, idTimer, setUserid, setIdChecked, setIdMessage)}
              />
              {idChecked && (
                  <div
                      className="absolute left-0 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg before:absolute before:top-[-6px] before:left-3 before:border-4 before:border-transparent before:border-b-red-100">
                    {idMessage}
                  </div>
              )}
            </div>
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
              <div className="relative items-center space-x-4">
                <input
                    type="password"
                    id="passwordcheck"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    onChange={e => checkPassword(e, password, setPasswordChecked)}
                />
                {passwordChecked && (
                    <div
                        className="absolute left-0 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg before:absolute before:top-[-6px] before:left-3 before:border-4 before:border-transparent before:border-b-red-100">
                      비밀번호가 다릅니다.
                    </div>
                )}
              </div>
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
              <button
                  type="button"
                  onClick={() => handleNicknameCheck(username, setNicknameChecked, setIsNickNameChecked)}
                  className="px-3 py-2 bg-traditionalBlue text-white rounded-lg text-sm hover:bg-blue-700 transition whitespace-nowrap"
              >
                중복 확인
              </button>
              {nicknameChecked && setIsNickNameChecked && (
                  <div
                      className="absolute left-0 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg before:absolute before:top-[-6px] before:left-3 before:border-4 before:border-transparent before:border-b-red-100">
                    중복된 닉네임이 있습니다.
                  </div>
              )}
              {!nicknameChecked && setIsNickNameChecked && (
                  <div
                      className="absolute left-0 mt-2 p-2 bg-red-100 text-green-500 text-sm rounded shadow-lg before:absolute before:top-[-6px] before:left-3 before:border-4 before:border-transparent before:border-b-red-100">
                    사용 가능한 닉네임입니다.
                  </div>
              )}
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button
              type="submit"
              onClick={(e) => handleSubmit(e, userid, username, password, navigate, idChecked, idMessage, nicknameChecked, passwordChecked, isNicknameChecked)}
              className="w-full bg-traditionalBlue text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            회원가입
          </button>
        </div>
      </section>
  );
};

export default SignupSection;
