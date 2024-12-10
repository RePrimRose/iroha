import React from 'react';
import {Link} from "react-router-dom";

const LoginSection = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 max-w-md bg-white shadow-lg rounded-lg p-8">
                {/* 섹션 제목 */}
                <h2 className="text-2xl font-bold text-traditionalBlue text-center mb-8">
                    로그인
                </h2>

                {/* ID 입력 */}
                <div className="mb-4">
                    <label
                        htmlFor="id"
                        className="block text-gray-700 font-medium mb-2 text-left"
                    >
                        아이디
                    </label>
                    <input
                        type="text"
                        id="id"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-traditionalBlue"
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                {/* 비밀번호 입력 */}
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
                    />
                </div>

                {/* 로그인 버튼 */}
                <button className="w-full bg-traditionalBlue text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition mb-4">
                    로그인
                </button>

                {/* 회원가입 및 ID/PW 찾기 */}
                <div className="flex justify-between text-sm text-gray-600">
                    <Link to="/signup" className="hover:underline">
                        회원가입
                    </Link>
                    <Link to="/forgot" className="hover:underline">
                        ID/PW 찾기
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;
