import {Link} from "react-router-dom";

const LearningSection = () => {
    return (
        <main className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-6">무엇을 학습할까요?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Kanji Card */}
                <Link
                    className="w-60 h-40 bg-white shadow-md rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                    to={"/kanji"}>
                    <div className="text-4xl">漢字</div>
                    <p className="mt-2 text-gray-600">한자를 학습해 보세요!</p>
                </Link>
                {/* Vocabulary Card */}
                <Link
                    className="w-60 h-40 bg-white shadow-md rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                    to={"/word"}>
                    <div className="text-4xl">단어</div>
                    <p className="mt-2 text-gray-600">단어를 학습해 보세요!</p>
                </Link>
            </div>
        </main>
    );
};

export default LearningSection;