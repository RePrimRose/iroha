import { useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

const TestHeader = () => {
    const {type} = useParams();
    const progress = useSelector((state) => state.testProgress.progressByType[type] || { total: 0, current: 0});

    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    }

    return (
        <header className="bg-sakura shadow-md">
            <div className="container mx-auto flex items-center relative py-4 px-6">
                {/* 🔙 뒤로 가기 버튼 */}
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-white/30 transition ml-4"
                >
                    <svg
                        className="w-8 h-8 text-traditionalBlue"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* 📊 프로그레스 바 (정확한 중앙 배치) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[300px]">
                    <div className="relative w-full bg-white rounded-full h-6 shadow-md">
                        <div
                            className="h-6 rounded-full transition-all duration-500 bg-green-500"
                            style={{ width: `${progress.current / progress.total * 100}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-traditionalBlue text-sm font-bold">
                            {progress.current} / {progress.total}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TestHeader;
