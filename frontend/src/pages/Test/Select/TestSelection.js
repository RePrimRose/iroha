import {Link} from "react-router-dom";

const TestSelection = () => {

    const testTypes = [
        { id: 1, name: "문장 순서 맞추기", description: "뒤섞인 단어들을 조합해서 문장을 맞춰보세요.", path: "order" },
        { id: 2, name: "단어 테스트", description: "단어 실력을 평가해보세요.", path: "word" },
        { id: 3, name: "한자 테스트", description: "한자 실력을 확인해보세요.", path: "kanji" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">테스트 유형 선택</h1>
            <div className="grid grid-cols-1 gap-6 w-3/4">
                {testTypes.map((test) => (
                    <Link
                        key={test.id}
                        to={`./${test.path}`}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold mb-2">{test.name}</h2>
                        <p className="text-gray-600">{test.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TestSelection;