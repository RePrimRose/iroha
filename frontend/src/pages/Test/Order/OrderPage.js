import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrProgress, setProgress, setTotalProgress} from "../../../redux/testProgressSlice";
import {useNavigate, useParams} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";

const OrderPage = () => {
    const [sentenceParts, setSentenceParts] = useState([]);
    const [translationParts, setTranslationParts] = useState([]);
    const [testId, setTestId] = useState();
    const [answer, setAnswer] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const {type} = useParams();
    const progress = useSelector((state) => state.testProgress.progressByType[type] || { total: 0, current: 0});
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                        type: type
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                dispatch(setProgress({ type: type, total: response.data.totalProgress, current: response.data.currProgress }));

                if (!response.data.test) {
                    setIsTestFinished(true);
                    return;
                }

                const sentence = response.data.test.question.map((item) => item.first);
                setSentenceParts(sentence);
                setTranslationParts(response.data.test.translate);
                setTestId(response.data.test.id);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleSubmitAnswer = async () => {
        try {
            const response = await axios.post('http://localhost/api/sentence/inOrderTest/check-answer',
                {
                    testId: testId,
                    answer: answer.join("")
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const isCorrect = response.data.isCorrect;
            setShowToast(true);
            setIsCorrect(isCorrect);

            const playSound = () => {
                const audio = new Audio(isCorrect ? "/sound/success.mp3" : "/sound/fail.mp3");
                audio.play().catch(err => console.log(err));
            }

            playSound();

            setTimeout(() => {
                setShowToast(false);
                getQuestion();
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const getQuestion = async () => {
        try {
            const response = await axios.post('http://localhost/api/sentence/inOrderTest',
                {
                    type: 'sentence-inOrder',
                    testId: testId,
                    answer: answer.join("")
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setProgress({ type: type, total: response.data.totalProgress, current: response.data.currProgress }));

            if (!response.data.test) {
                setIsTestFinished(true);
                return;
            }

            const sentence = response.data.test.question.map((item) => item.first);
            setSentenceParts(sentence);
            setTranslationParts(response.data.test.translate);
            setTestId(response.data.test.id);
            setAnswer([]);
        } catch (error) {
            console.log(error);
        }
    };

    if (isTestFinished) {
        return (
            <Modal>
                <h2 className="text-2xl font-bold text-gray-900">테스트 완료!</h2>
                <p className="mt-4 text-lg text-gray-700">
                    {progress.total}문제 중 <span className="font-bold text-blue-600">{progress.current}</span>문제를 해결했습니다.
                </p>

                <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${(progress.current / progress.total) * 100}%` }}
                    ></div>
                </div>

                <p className="mt-4 text-lg text-gray-700">
                    점수 변화: <span className="font-bold text-red-500">{0}</span> →{" "}
                    <span className="font-bold text-green-500">{20}</span>
                </p>

                <button
                    className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
            </Modal>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

            {showToast && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={isCorrect ? "/image/check-mark.png" : "/image/cross-mark.png"}
                        alt={isCorrect ? "정답" : "오답"}
                        className="w-32 h-32 object-contain drop-shadow-lg"
                    />
                </div>
            )}

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
                onClick={handleSubmitAnswer}
                className="mt-8 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
            >
                제출
            </button>
        </div>
    );
};

const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">{children}</div>
    </div>
);

export default OrderPage;