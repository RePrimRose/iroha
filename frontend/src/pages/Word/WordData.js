import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const WordData = () => {
    const token = localStorage.getItem('token');
    const {word} = useParams();
    const [wordData, setWordData] = useState();
    const [sentenceData, setSentenceData] = useState([]);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await axios.get('http://localhost/api/word/detail', {
                    params: {
                        word: word
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setWordData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSentence = async () => {
            try {
                const response = await axios.get('http://localhost/api/sentence/example', {
                    params: {
                        word: word
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWord();
        fetchSentence();
    }, [word]);

    if (!wordData) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            {/* 단어 제목과 후리가나 */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">{wordData.word}</h1>
                <p className="text-lg text-gray-500">{wordData.furigana}</p>
            </div>

            {/* 단어 정보 섹션 */}
            <div className="p-6 bg-white shadow-md rounded-lg w-3/4">
                {/* 의미 */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">의미</h2>
                    <p className="text-lg">{wordData.meaning}</p>
                </div>

                <hr className="my-4 border-t border-gray-300" />

                {/* 예문 */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">예문</h2>
                    <div className="flex flex-col gap-4">
                        {sentenceData.map((example, index) => (
                            <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                                <p
                                    className="text-lg mb-2"
                                    dangerouslySetInnerHTML={{__html: example.sentenceWithRuby}}
                                    style={{ fontSize: '1.25rem' }}
                                ></p>
                                <p className="text-sm text-gray-500">{example.translate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordData;