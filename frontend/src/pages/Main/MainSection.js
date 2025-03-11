import React from 'react';
import {Link} from "react-router-dom";

const MainSection = () => {
    return (
        <section className="bg-sakura py-16">
            <div className="container mx-auto px-6 text-center">
                {/* 메인 제목 */}
                <h1 className="text-4xl md:text-5xl font-bold text-traditionalBlue mb-4">
                    일본어 학습, 쉽게
                </h1>
                {/* 부제 */}
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                    IROHA와 함께 단어 학습, 한자 학습, 그리고 각종 테스트를 통해 일본어 실력을 향상시켜보세요.
                </p>
                {/* Call-to-Action 버튼 */}
                <div>
                    <Link
                        to={"/login"}
                        className="bg-traditionalBlue text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        로그인 하기
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
