import React from 'react';

const AdditionalSection = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-traditionalBlue mb-12">
                    주요 기능
                </h2>
                {/* 카드 섹션 */}
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
                    {/* 카드 3 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                        <div className="text-5xl text-traditionalBlue mb-4">🔍</div>
                        <h3 className="text-xl font-bold mb-2">레벨 테스트</h3>
                        <p className="text-gray-700">
                            당신의 일본어 레벨을 파악하고 맞춤형 학습을 시작하세요.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdditionalSection;
