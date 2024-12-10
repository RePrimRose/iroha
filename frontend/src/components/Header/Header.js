import React from 'react';

const Header = () => {
    return (
        <header className="bg-sakura shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* 로고 */}
                <div className="text-traditionalBlue font-bold text-2xl">
                    IROHA
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="#home"
                        className="text-gray-800 hover:text-traditionalBlue transition"
                    >
                        홈
                    </a>
                    <a
                        href="#learn"
                        className="text-gray-800 hover:text-traditionalBlue transition"
                    >
                        단어 학습
                    </a>
                    <a
                        href="#test"
                        className="text-gray-800 hover:text-traditionalBlue transition"
                    >
                        레벨 테스트
                    </a>
                    <a
                        href="#progress"
                        className="text-gray-800 hover:text-traditionalBlue transition"
                    >
                        내 학습 기록
                    </a>
                </nav>

                {/* 모바일 메뉴 버튼 */}
                <div className="md:hidden flex items-center">
                    <button className="text-traditionalBlue focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
