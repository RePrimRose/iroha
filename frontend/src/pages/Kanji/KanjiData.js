import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const KanjiData = () => {
    const token = localStorage.getItem('token');
    const {level, kanji} = useParams();
    const [kanjiData, setKanjiData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/kanji/detail', {
                    params: {
                        kanji: kanji
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setKanjiData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [kanji]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {kanjiData ? (
                <>
                {/* 한자 이미지 */}
                <div className="mb-8">
                    <img
                        src={`https://elasticbeanstalk-ap-northeast-2-339712908446.s3.ap-northeast-2.amazonaws.com/japanese_kanji_pictures/${kanjiData.kanji}.jpg`}
                        alt={kanjiData.kanji}
                        className="w-40 h-40 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* 한자 정보 섹션 */}
                <div className="p-6 bg-white shadow-md rounded-lg w-3/4">
                    {/* 의미 */}
                    <div className="mb-6 flex">
                        <h2 className="text-xl font-semibold w-1/4">의미</h2>
                        <div className="w-3/4">
                            {JSON.parse(kanjiData.meanings).map((meaning, index) => (
                                <div key={index} className="mb-1">
                                    {meaning}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 음독 */}
                    <div className="mb-6 flex">
                        <h2 className="text-xl font-semibold w-1/4">음독 (On-yomi)</h2>
                        <div className="w-3/4">
                            {JSON.parse(kanjiData.onYomi).map((reading, index) => (
                                <div key={index} className="mb-1">
                                    {reading}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 훈독 */}
                    <div className="mb-6 flex">
                        <h2 className="text-xl font-semibold w-1/4">훈독 (Kun-yomi)</h2>
                        <div className="w-3/4">
                            {JSON.parse(kanjiData.kunYomi).map((reading, index) => (
                                <div key={index} className="mb-1">
                                    {reading}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 발음 */}
                    <div className="mb-6 flex items-center">
                        <h2 className="text-xl font-semibold w-1/4">발음</h2>
                        <div className="w-3/4 flex items-center gap-4">
                            <span className="text-lg">{kanjiData.pronunciation}</span>
                            <button
                                className="p-2 bg-gray-200 rounded-full shadow-sm"
                            >
                                🔊
                            </button>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <p>로딩중</p>
            )}
        </div>
    );
};

export default KanjiData;