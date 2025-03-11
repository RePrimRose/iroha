import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {checkPassword, handleIdCheck, handleNicknameCheck, handleSubmit} from "./SignUpUtils";

const SignupSection = () => {
  const [idChecked, setIdChecked] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idMessage, setIdMessage] = useState("");
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isNicknameChecked, setIsNickNameChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-lg bg-white shadow-lg rounded-lg p-10">
          {/* 섹션 제목 */}
          <h2 className="text-2xl font-bold text-traditionalBlue text-center mb-8">
            회원가입
          </h2>

          {/* ID 입력 및 중복 확인 */}
          <div className="mb-10">
            <label
                htmlFor="id"
                className="block text-gray-700 font-medium mb-2 text-left"
            >
              아이디
            </label>
            <div className="relative flex items-center space-x-4">
              <input
                  type="text"
                  id="id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                  placeholder="아이디를 입력하세요"
                  onChange={(e) => setUserid(e.target.value)}
              />
              <button
                  type="button"
                  onClick={() => handleIdCheck(userid, setIdChecked, setIsIdChecked, setIdMessage)}
                  className="px-3 py-2 bg-traditionalBlue text-white rounded-lg text-sm hover:bg-blue-700 transition whitespace-nowrap"
              >
                아이디 확인
              </button>
              {isIdChecked && (
                  <div className="absolute top-full -left-4 p-2 w-max text-sm rounded">
                    {idChecked ? (
                        <div className="bg-red-100 text-red-700 before:border-b-red-100 p-2 rounded">
                          {idMessage}
                        </div>
                    ) : (
                        <div className="bg-green-100 text-green-700 before:border-b-green-100 p-2 rounded">
                          사용 가능한 아이디입니다.
                        </div>
                    )}
                  </div>
              )}
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-10 flex-col">
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
                        className="absolute -left-4 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded">
                      비밀번호가 다릅니다.
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* 닉네임 입력 및 중복 확인 */}
          <div className="mb-10">
            <label
                htmlFor="nickname"
                className="block text-gray-700 font-medium mb-2 text-left"
            >
              닉네임
            </label>
            <div className="relative flex items-center space-x-4">
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
              {isNicknameChecked && (
                  <div className="absolute top-full -left-4 p-2 w-max text-sm rounded">
                    {nicknameChecked ? (
                        <div className="bg-red-100 text-red-700 before:border-b-red-100 p-2 rounded">
                          중복된 닉네임이 있습니다.
                        </div>
                    ) : (
                        <div className="bg-green-100 text-green-700 before:border-b-green-100 p-2 rounded">
                          사용 가능한 닉네임입니다.
                        </div>
                    )}
                  </div>
              )}
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button
              type="submit"
              onClick={(e) => handleSubmit(e, userid, username, password, navigate, idChecked, idMessage, nicknameChecked, passwordChecked, isNicknameChecked, isIdChecked)}
              className="w-full bg-traditionalBlue text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            회원가입
          </button>
        </div>
      </section>
  );
};

export default SignupSection;
