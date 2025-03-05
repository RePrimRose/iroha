import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const TestSelection = () => {
    const [testTypes, setTestTypes] = useState([
        { name: "문장 순서 맞추기", description: "뒤섞인 단어들을 조합해서 문장을 맞춰보세요.", type: "sentence-inOrder", totalProgress: 0, currProgress: 0, reviewRatio: 0 },
        { name: "빈칸 채우기", description: "빈칸에 들어갈 단어를 맞춰보세요.", type: "word-fillBlank", totalProgress: 0, currProgress: 0, reviewRatio: 0},
        { name: "단어 뜻 맞추기", description: "단어의 뜻을 맞춰보세요.", type: "word-word", totalProgress: 0, currProgress: 0, reviewRatio: 0},
        { name: "한자 뜻 맞추기", description: "한자의 뜻을 맞춰보세요.", type: "kanji-kanji", totalProgress: 0, currProgress: 0, reviewRatio: 0 },]);

    const [openTestType, setOpenTestType] = useState(null);
    const [problemPerDay, setProblemPerDay] = useState({});
    const [reviewRatios, setReviewRatios] = useState({});
    const [customInputs, setCustomInputs] = useState({});
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/test/getTestProgress`, {
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;

                const updatedTestTypes = testTypes.map((test) => {
                    const type = test.type;
                    return {
                        ...test,
                        totalProgress: data.problemPerDay?.[type] ?? test.totalProgress,
                        currProgress: data.totalProgress?.[type] ?? test.currProgress,
                        reviewRatio: (data.reviewRatio?.[type] ?? test.reviewRatio / 100) * 100, // 백분율 변환
                    };
                });

                setTestTypes(updatedTestTypes);

                const updatedProblemPerDay = {};
                const updatedReviewRatios = {};
                const updatedCustomInputs = {};

                updatedTestTypes.forEach((test) => {
                    const type = test.type;
                    const problemCount = data.problemPerDay?.[type] ?? test.totalProgress;
                    const reviewRatio = (data.reviewRatio?.[type] ?? test.reviewRatio) * 100;

                    const isCustomProblemCount = ![20, 40, 60, 80, 100].includes(problemCount);
                    const isCustomReviewRatio = ![30, 50].includes(reviewRatio);

                    updatedProblemPerDay[type] = isCustomProblemCount ? "기타" : problemCount;
                    updatedReviewRatios[type] = isCustomReviewRatio ? "기타" : reviewRatio;

                    if (isCustomProblemCount) {
                        updatedCustomInputs[`count-${type}`] = problemCount.toString();
                    }
                    if (isCustomReviewRatio) {
                        updatedCustomInputs[`review-${type}`] = reviewRatio.toString();
                    }
                });

                setProblemPerDay(updatedProblemPerDay);
                setReviewRatios(updatedReviewRatios);
                setCustomInputs(updatedCustomInputs);

            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    const toggleDropdown = (type) => {
        setOpenTestType(openTestType === type ? null : type);
    };

    const handleTestCountChange = (type, value) => {
        setProblemPerDay({ ...problemPerDay, [type]: value });
        setCustomInputs({ ...customInputs, [`count-${type}`]: value === "기타" ? "" : null });
    };

    const handleReviewRatioChange = (type, value) => {
        setReviewRatios({ ...reviewRatios, [type]: value });
        setCustomInputs({ ...customInputs, [`review-${type}`]: value === "기타" ? "" : null });
    };

    const handleCustomInputChange = (id, type, value) => {
        if (value === "" || Number(value) > 0) {
            setCustomInputs({ ...customInputs, [`${type}-${id}`]: value });
        }
    };

    const handleCustomInputSubmit = (id, type, event) => {
        if (event.key === "Enter") {
            const inputValue = Number(customInputs[id]);
            if (inputValue > 0) {
                if (type === "count") {
                    setProblemPerDay({ ...problemPerDay, [id]: inputValue });
                } else if (type === "review") {
                    setReviewRatios({ ...reviewRatios, [id]: inputValue });
                }
            }
        }
    };

    const handleBlur = ( type) => {
        const inputValue = Number(customInputs[`${type}`]);
        if (inputValue < 0 || isNaN(inputValue)) {
            setCustomInputs({ ...customInputs, [`${type}`]: "0" });
        }
    };

    const handleSubmit = async (type, problemPerDay, reviewRatio) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/test/settings`,
                {
                    type: type,
                    problemPerDay: problemPerDay,
                    reviewRatio: reviewRatio
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success === true) {
                navigate(`./${type}`);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">테스트 유형 선택</h1>
            <div className="grid grid-cols-1 gap-6 w-3/4">
                {testTypes.map((test) => (
                    <div key={test.type} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                        <div className="flex flex-col items-center" onClick={() => toggleDropdown(test.type)}>
                            <h2 className="text-xl font-semibold">{test.name}</h2>
                            <p className="text-gray-600">{test.description}</p>
                            <div className="relative w-full max-w-[300px] mt-3">
                                <div className="relative w-full bg-white rounded-full h-6 shadow-md">
                                    <div
                                        className="h-6 rounded-full transition-all duration-500 bg-green-500"
                                        style={{ width: `${test.currProgress / test.totalProgress * 100}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-traditionalBlue text-sm font-bold">
                                        {test.currProgress} / {test.totalProgress}
                                    </div>
                                </div>
                            </div>
                            <button className="text-blue-500 font-semibold mt-4">설정 ▼</button>
                        </div>

                        {openTestType === test.type && (
                            <div className="mt-4 border-t pt-4">
                                <h3 className="text-lg font-semibold mb-3">테스트 문제 개수</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[20, 40, 60, 80, 100].map((num) => (
                                        <button
                                            key={num}
                                            className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                                problemPerDay[test.type] === num ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                            onClick={() => handleTestCountChange(test.type, num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <button
                                        className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                            problemPerDay[test.type] === "기타" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                        onClick={() => handleTestCountChange(test.type, "기타")}
                                    >
                                        기타
                                    </button>
                                    {problemPerDay[test.type] === "기타" && (
                                        <input
                                            type="number"
                                            className="border px-4 py-2 rounded-lg w-24 text-center text-lg"
                                            placeholder="입력"
                                            value={customInputs[`count-${test.type}`] || ""}
                                            onChange={(e) => handleCustomInputChange(test.type, "count", e.target.value)}
                                            onKeyPress={(e) => handleCustomInputSubmit(test.type, "count", e)}
                                            onBlur={() => handleBlur(test.type, "count")}
                                        />
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold mt-6 mb-3">리뷰 문제 비율</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[30, 50].map((ratio) => (
                                        <button
                                            key={ratio}
                                            className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                                reviewRatios[test.type] === ratio ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                            onClick={() => handleReviewRatioChange(test.type, ratio)}
                                        >
                                            {ratio}%
                                        </button>
                                    ))}
                                    <button
                                        className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                            reviewRatios[test.type] === "기타" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                        onClick={() => handleReviewRatioChange(test.type, "기타")}
                                    >
                                        기타
                                    </button>
                                    {reviewRatios[test.type] === "기타" && (
                                        <input
                                            type="number"
                                            className="border px-4 py-2 rounded-lg w-24 text-center text-lg"
                                            placeholder="입력"
                                            value={customInputs[`review-${test.type}`] || ""}
                                            onChange={(e) => handleCustomInputChange(test.type, "review", e.target.value)}
                                            onKeyPress={(e) => handleCustomInputSubmit(test.type, "review", e)}
                                            onBlur={() => handleBlur(test.type, "review")}
                                        />
                                    )}
                                </div>

                                <button
                                    className="block mt-6 bg-blue-500 text-white text-center py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition w-2/3 mx-auto"
                                    onClick={() =>
                                        handleSubmit(
                                            test.type,
                                            problemPerDay[test.type] === "기타" ? Number(customInputs[`count-${test.type}`]) || 1 : problemPerDay[test.type],
                                            reviewRatios[test.type] === "기타" ? Number(customInputs[`review-${test.type}`]) || 0 : reviewRatios[test.type]
                                        )}
                                >
                                    테스트 시작
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestSelection;
