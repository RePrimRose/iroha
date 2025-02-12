import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setCurrProgress, setTotalProgress} from "../../../redux/testProgressSlice";

const OrderPage = () => {
    const [sentenceParts, setSentenceParts] = useState([]);
    const [translationParts, setTranslationParts] = useState([]);
    const [testId, setTestId] = useState();
    const [answer, setAnswer] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const handleAddToAnswer = (part) => {
        setAnswer((prev) => [...prev, part]);
    };

    const handleRemoveFromAnswer = (index) => {
        setAnswer((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index) => {
        setAnswer((prev) => {
            const updated = [...prev];
            const [movedItem] = updated.splice(draggedIndex, 1);
            updated.splice(index, 0, movedItem);
            return updated;
        });
        setDraggedIndex(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost/api/sentence/inOrderTest',
                    {
                        type: 'inorder'
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSentenceParts(JSON.parse(response.data.testSentence.dividedSentence));
                setTranslationParts(response.data.testSentence.translate);
                setTestId(response.data.testSentence.id);
                dispatch(setTotalProgress(response.data.totalProgress));
                dispatch(setCurrProgress(response.data.currProgress));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async () => {
        alert(answer);
        try {
            const response = await axios.post('http://localhost/api/sentence/inOrderTest',
                {
                    type: 'inorder',
                    testId: testId,
                    answer: answer.join("")
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setSentenceParts(JSON.parse(response.data.testSentence.dividedSentence));
            setTranslationParts(response.data.testSentence.translate);
            setTestId(response.data.testSentence.id);
            setAnswer([]);
            dispatch(setCurrProgress(response.data.currProgress));
        } catch (error) {
            console.log(error);
        }
    };

    if (!testId) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

            {/* 번역 문장 */}
            <p className="text-lg text-gray-700 italic mb-4 w-2/3 text-center">
                "{translationParts}"
            </p>

            {/* 정답칸 */}
            <div className="p-6 bg-white shadow-md rounded-lg w-2/3 max-w-3xl mb-8">
                <h2 className="text-xl font-semibold mb-4">정답칸</h2>
                <div className="flex gap-2 flex-wrap min-h-[50px] p-2 border border-dashed border-gray-300 rounded justify-center">
                    {answer.map((part, index) => (
                        <div
                            key={index}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-move"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index)}
                            onClick={() => handleRemoveFromAnswer(index)}
                        >
                            {part}
                        </div>
                    ))}
                </div>
            </div>

            {/* 문장 버튼 영역 */}
            <div className="p-6 bg-white shadow-md rounded-lg w-2/3 max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">문장 버튼</h2>
                <div className="flex gap-3 flex-wrap justify-center">
                    {sentenceParts.map((part, index) => (
                        <button
                            key={index}
                            onClick={() => handleAddToAnswer(part)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            {part}
                        </button>
                    ))}
                </div>
            </div>

            {/* 제출 버튼 */}
            <button
                onClick={handleSubmit}
                className="mt-8 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
            >
                제출
            </button>
        </div>
    );
};

export default OrderPage;