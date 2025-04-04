import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getPageNumbers} from "../../Utils/Utils";

const WordList = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const [pageNumbers, setPageNumbers] = useState([]);
    const { level } = useParams();
    const [wordList, setWordList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchWordList = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/word/list`, {
                    params: {
                        page: page - 1,
                        size: 12,
                        level: level
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setWordList(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWordList();
    }, [page]);

    useEffect(() => {
        if (totalPages > 0) {
            setPageNumbers(getPageNumbers(totalPages, Number(page)));
        }
    }, [totalPages, page]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-2xl font-bold my-6">단어 목록</h1>
            <div className="grid grid-cols-3 gap-4">
                {wordList.map((word) => (
                    <Link
                        key={word.id}
                        className="w-40 h-40 bg-white shadow-md rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition"
                        to={`${location.pathname}/${word.word}`}>
                        {word.word}<br/>{word.furigana}
                    </Link>
                ))}
            </div>

            {/* 페이지네이션 버튼 */}
            <div className="mt-6 flex items-center gap-2">
                {/* 이전 버튼 */}
                <Link
                    to={`${location.pathname}?page=${Math.max(1, Number(page) - 1)}`}
                    className={`px-4 py-2 rounded-lg ${
                        Number(page) === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
                    }`}
                    aria-disabled={Number(page) === 1}
                >
                    &lt;
                </Link>

                {/* 페이지 번호 버튼 */}
                {pageNumbers.map((num) => (
                    <Link
                        key={num}
                        to={`${location.pathname}?page=${num}`}
                        className={`px-4 py-2 rounded-lg ${
                            num === Number(page) ? 'bg-blue-700 text-white font-bold' : 'bg-blue-500 text-white'
                        }`}
                    >
                        {num}
                    </Link>
                ))}

                {/* 다음 버튼 */}
                <Link
                    to={`${location.pathname}?page=${Math.min(totalPages, Number(page) + 1)}`}
                    className={`px-4 py-2 rounded-lg ${
                        Number(page) === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
                    }`}
                    aria-disabled={Number(page) === totalPages}
                >
                    &gt;
                </Link>
            </div>
        </div>
    );
};

export default WordList;