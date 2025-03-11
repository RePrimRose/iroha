import React from 'react';

const NormalCardSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <div className="text-5xl text-traditionalBlue mb-4">📘</div>
                <h3 className="text-xl font-bold mb-2">단어 학습</h3>
                <p className="text-gray-700">
                    8,000개 이상의 단어와 예문을 통해 어휘력을 키우세요.
                </p>
            </div>
            {/* 카드 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <div className="text-5xl text-traditionalBlue mb-4">🖋️</div>
                <h3 className="text-xl font-bold mb-2">문장 연습</h3>
                <p className="text-gray-700">
                    다양한 문장으로 문법과 작문 실력을 쌓아보세요.
                </p>
            </div>
        </div>
    );
};

export default NormalCardSection;