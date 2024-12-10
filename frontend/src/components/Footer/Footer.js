import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-traditionalBlue text-white py-8">
            <div className="container mx-auto px-6">
                {/* Footer 상단: 로고 및 사이트 설명 */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* 로고 */}
                    <div className="text-2xl font-bold">
                        IROHA
                    </div>
                    {/* 사이트 설명 */}
                    <p className="text-center md:text-left text-sm mt-4 md:mt-0 md:max-w-md">
                        일본어를 쉽고 재미있게 배우세요. IROHA는 단어 학습, 문장 연습, 레벨 테스트 등 다양한 학습 방법을 제공합니다.
                    </p>
                </div>

                {/* Footer 하단: 저작권 및 소셜 미디어 */}
                <div className="mt-8 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center">
                    {/* 저작권 */}
                    <p className="text-sm">&copy; 2024 IROHA. 모든 권리 보유.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
