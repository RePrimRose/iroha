import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthenticated} from "../../redux/authenticationSlice";

const MainHeader = () => {
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
    const dispatch = useDispatch();

    // 로그아웃
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getAuthenticated = async () => {
            try {
                if (token) {
                    const response = await axios.post(`${API_BASE_URL}/auth/check`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setUsername(response.data.username);
                    dispatch(setIsAuthenticated(true));
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAuthenticated();
    }, []);

    return (
        <header className="bg-sakura shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* 로고 */}
                <Link
                    className="text-traditionalBlue font-bold text-2xl"
                    to="/">
                    IROHA
                </Link>

                {/* 네비게이션 메뉴 */}
                <nav className="hidden md:flex space-x-6">
                    {
                        isAuthenticated ? (
                            <button
                                className="bg-transparent text-gray-800 hover:text-red-600 focus:outline-none"
                                onClick={logout}
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link
                                className="text-gray-800 hover:text-traditionalBlue transition"
                                to="/login">
                                로그인
                            </Link>
                        )
                    }
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

export default MainHeader;
