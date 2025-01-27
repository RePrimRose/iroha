import {useState} from "react";

const OrderPage = () => {
    const sentenceParts = ["저는", "아침에", "산책을", "했습니다"];
    const [answer, setAnswer] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* 제목 */}
            <h1 className="text-3xl font-bold mb-8">순서 맞추기 테스트</h1>

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
        </div>
    );
};

export default OrderPage;