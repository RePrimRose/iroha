import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {handleReadingClick} from "../../Utils/Utils";

const KanjiData = () => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const {level, kanji} = useParams();
    const [kanjiData, setKanjiData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/kanji/detail`, {
                    params: {
                        kanji: kanji
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setKanjiData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [kanji]);

    const handleSpeakerClick = () => {
        alert("발음을 들어보고 싶다면 원하는 발음을 클릭해보세요!");
    };

    if (!kanjiData) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            {/* 발음 제목 */}
            <h1 className="text-4xl font-bold mb-4">{kanjiData.pronunciation}</h1>

            {/* 한자 이미지 */}
            <div className="mb-8">
                <img
                    src={`https://d1gowhuyxzyrhv.cloudfront.net/kanji/${kanjiData.kanji}.jpg`}
                    alt={kanjiData.kanji}
                    className="w-40 h-40 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* 한자 정보 섹션 */}
            <div className="p-6 bg-white shadow-md rounded-lg w-3/4">
                {/* 상단 레이아웃: 제목 + 스피커 버튼 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">한자 정보</h2>
                    <button
                        onClick={handleSpeakerClick}
                        className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
                        aria-label="발음 듣기"
                    >
                        🔊
                    </button>
                </div>

                {/* 음독 */}
                {kanjiData.onYomi && JSON.parse(kanjiData.onYomi).length > 0 && (
                    <div className="mb-6 flex">
                        <h2 className="text-xl font-semibold w-1/4">음독</h2>
                        <div className="w-3/4 flex gap-3 flex-wrap">
                            {JSON.parse(kanjiData.onYomi)[0]
                                .split("、") // 쉼표로 나누기
                                .map((reading, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleReadingClick(reading)}
                                        className="px-3 py-1 border border-gray-400 rounded-lg transition"
                                    >
                                        {reading}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}

                {/* 훈독 */}
                {kanjiData.kunYomi && JSON.parse(kanjiData.kunYomi).length > 0 && (
                    <div className="mb-6 flex">
                        <h2 className="text-xl font-semibold w-1/4">훈독</h2>
                        <div className="w-3/4 flex gap-3 flex-wrap">
                            {JSON.parse(kanjiData.kunYomi)[0]
                                .split("、") // 쉼표로 나누기
                                .map((reading, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleReadingClick(reading)}
                                        className="px-3 py-1 border border-gray-400 rounded-lg transition"
                                    >
                                        {reading}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}

                <hr className="my-4 border-t border-gray-300" />

                {/* 의미 */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">의미</h2>
                    <ul className="list-decimal list-inside">
                        {JSON.parse(kanjiData.meanings).map((meaning, index) => (
                            <li key={index} className="mb-1">
                                {meaning}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default KanjiData;