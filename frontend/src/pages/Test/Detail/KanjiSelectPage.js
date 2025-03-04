import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setProgress} from "../../../redux/testProgressSlice";

const KanjiSelectPage = () => {
    const [testId, setTestId] = useState();
    const [kanji, setKanji] = useState();
    const [meaningParts, setMeaningParts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [level, setLevel] = useState("");
    const [isTestFinished, setIsTestFinished] = useState(false);

    const {type} = useParams();
    const progress = useSelector((state) => state.testProgress.progressByType[type] || { total: 0, current: 0});
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getQuestion();
    }, []);

    const getQuestion = async (isCorrect) => {
        try {
            const response = await axios.post('http://localhost/api/test/get-test',
                {
                    type: type,
                    level: level === "" ? null : level,
                    isCorrect: isCorrect ? isCorrect : false
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setProgress({ type: type, total: response.data.totalProgress, current: response.data.currProgress }));

            if (!response.data.test) {
                setShowModal(true);
                return;
            }

            setKanji(response.data.test.question);
            setMeaningParts(response.data.test.choices);
            setTestId(response.data.test.id);
            setLevel(response.data.test.level);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitAnswer = async (answer) => {
        try {

            const response = await axios.post('http://localhost/api/test/check-answer',
                {
                    type: type,
                    testId: testId,
                    answer: answer
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
                getQuestion(isCorrect);
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">

            <div className="relative mb-14 flex flex-col items-center">
                <img
                    src={`/kanji/${kanji}.jpg`}
                    alt={kanji}
                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -top-8 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-md">
                    JLPT {level}
                </div>
            </div>

            {showToast && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={isCorrect ? "/image/check-mark.png" : "/image/cross-mark.png"}
                        alt={isCorrect ? "정답" : "오답"}
                        className="w-32 h-32 object-contain drop-shadow-lg"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 w-80">
                {meaningParts.map((meaning, index) => (
                    <button
                        key={index}
                        onClick={() => handleSubmitAnswer(meaning)}
                        className="w-full h-20 bg-white text-lg font-semibold border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition p-3 text-center"
                    >
                        {JSON.parse(meaning).map((item, index, array) => (
                            index === array.length - 1 ? item : item + ", "
                        ))}
                    </button>
                ))}
            </div>

            {showModal && (
                <Modal>
                    <h2 className="text-2xl font-bold text-gray-900">테스트 완료!</h2>
                    <p className="mt-4 text-lg text-gray-700">
                        {progress.total}문제 중 <span className="font-bold text-blue-600">{progress.current}</span>문제를 해결했습니다.
                    </p>
                    <div className="relative w-full bg-gray-200 h-6 rounded-full overflow-hidden mt-4">
                        <div
                            className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
                            style={{ width: `${(progress.current / progress.total) * 100}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-traditionalBlue text-sm font-bold">
                            {progress.current} / {progress.total}
                        </div>
                    </div>
                    <button
                        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                        onClick={() => navigate(-1)}
                    >
                        돌아가기
                    </button>
                </Modal>
            )}

        </div>
    );
}

const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">{children}</div>
    </div>
);

export default KanjiSelectPage;