import {Link} from "react-router-dom";

const KanjiSelection = () => {
    const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];

    return (
        <main className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-6">한자 등급을 선택하세요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {levels.map((level) => (
                    <Link key={level}
                          className="w-40 h-40 bg-white shadow-md rounded-lg flex items-center justify-center text-xl font-bold hover:bg-blue-100 transition"
                          to={`./${level}`}>
                        {level}
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default KanjiSelection;