import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const TestSelection = () => {
    const testTypes = [
        { id: 1, name: "문장 순서 맞추기", description: "뒤섞인 단어들을 조합해서 문장을 맞춰보세요.", type: "sentence-inOrder", progress: 0, totalProgress: 0, currProgress: 0 },
        { id: 2, name: "단어 테스트", description: "단어 실력을 평가해보세요.", type: "word", progress: 0, totalProgress: 0, currProgress: 0 },
        { id: 3, name: "한자 테스트", description: "한자 실력을 확인해보세요.", type: "kanji", progress: 0, totalProgress: 0, currProgress: 0 },
    ];

    const [openTestId, setOpenTestId] = useState(null);
    const [testCounts, setTestCounts] = useState({});
    const [reviewRatios, setReviewRatios] = useState({});
    const [customInputs, setCustomInputs] = useState({});

    useEffect(() => {
        const fetchData = async () => {

        }
    }, []);

    const toggleDropdown = (id) => {
        setOpenTestId(openTestId === id ? null : id);
    };

    const handleTestCountChange = (id, value) => {
        setTestCounts({ ...testCounts, [id]: value });
        setCustomInputs({ ...customInputs, [`count-${id}`]: value === "기타" ? "" : null });
    };

    const handleReviewRatioChange = (id, value) => {
        setReviewRatios({ ...reviewRatios, [id]: value });
        setCustomInputs({ ...customInputs, [`review-${id}`]: value === "기타" ? "" : null });
    };

    const handleCustomInputChange = (id, type, value) => {
        if (value === "" || Number(value) > 0) {
            setCustomInputs({ ...customInputs, [`${type}-${id}`]: value });
        }
    };

    const handleCustomInputSubmit = (id, type, event) => {
        if (event.key === "Enter") {
            const inputValue = Number(customInputs[`${type}-${id}`]);
            if (inputValue > 0) {
                if (type === "count") {
                    setTestCounts({ ...testCounts, [id]: inputValue });
                } else if (type === "review") {
                    setReviewRatios({ ...reviewRatios, [id]: inputValue });
                }
            }
        }
    };

    const handleBlur = (id, type) => {
        const inputValue = Number(customInputs[`${type}-${id}`]);
        if (inputValue <= 0 || isNaN(inputValue)) {
            setCustomInputs({ ...customInputs, [`${type}-${id}`]: "1" });
        }
    };

    const handleSubmit = () => {
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">테스트 유형 선택</h1>
            <div className="grid grid-cols-1 gap-6 w-3/4">
                {testTypes.map((test) => (
                    <div key={test.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                        <div className="flex flex-col items-center" onClick={() => toggleDropdown(test.id)}>
                            <h2 className="text-xl font-semibold">{test.name}</h2>
                            <p className="text-gray-600">{test.description}</p>
                            <div className="relative w-full max-w-[300px] mt-3">
                                <div className="relative w-full bg-white rounded-full h-6 shadow-md">
                                    <div
                                        className="h-6 rounded-full transition-all duration-500 bg-green-500"
                                        style={{ width: `${test.progress}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-traditionalBlue text-sm font-bold">
                                        {test.progress}%
                                    </div>
                                </div>
                            </div>
                            <button className="text-blue-500 font-semibold mt-4">설정 ▼</button>
                        </div>

                        {openTestId === test.id && (
                            <div className="mt-4 border-t pt-4">
                                <h3 className="text-lg font-semibold mb-3">테스트 문제 개수</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[20, 40, 60, 80, 100].map((num) => (
                                        <button
                                            key={num}
                                            className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                                testCounts[test.id] === num ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                            onClick={() => handleTestCountChange(test.id, num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <button
                                        className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                            testCounts[test.id] === "기타" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                        onClick={() => handleTestCountChange(test.id, "기타")}
                                    >
                                        기타
                                    </button>
                                    {testCounts[test.id] === "기타" && (
                                        <input
                                            type="number"
                                            className="border px-4 py-2 rounded-lg w-24 text-center text-lg"
                                            placeholder="입력"
                                            value={customInputs[`count-${test.id}`] || ""}
                                            onChange={(e) => handleCustomInputChange(test.id, "count", e.target.value)}
                                            onKeyPress={(e) => handleCustomInputSubmit(test.id, "count", e)}
                                            onBlur={() => handleBlur(test.id, "count")}
                                        />
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold mt-6 mb-3">리뷰 문제 비율</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[30, 50].map((ratio) => (
                                        <button
                                            key={ratio}
                                            className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                                reviewRatios[test.id] === ratio ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                            onClick={() => handleReviewRatioChange(test.id, ratio)}
                                        >
                                            {ratio}%
                                        </button>
                                    ))}
                                    <button
                                        className={`w-24 h-12 rounded-lg text-lg font-semibold transition ${
                                            reviewRatios[test.id] === "기타" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                        onClick={() => handleReviewRatioChange(test.id, "기타")}
                                    >
                                        기타
                                    </button>
                                    {reviewRatios[test.id] === "기타" && (
                                        <input
                                            type="number"
                                            className="border px-4 py-2 rounded-lg w-24 text-center text-lg"
                                            placeholder="입력"
                                            value={customInputs[`review-${test.id}`] || ""}
                                            onChange={(e) => handleCustomInputChange(test.id, "review", e.target.value)}
                                            onKeyPress={(e) => handleCustomInputSubmit(test.id, "review", e)}
                                            onBlur={() => handleBlur(test.id, "review")}
                                        />
                                    )}
                                </div>

                                <Link
                                    to={`./${test.path}?count=${testCounts[test.id] || 20}&review=${reviewRatios[test.id] || 30}`}
                                    className="block mt-6 bg-blue-500 text-white text-center py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition w-2/3 mx-auto"
                                >
                                    테스트 시작
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestSelection;
