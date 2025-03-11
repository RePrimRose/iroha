import React from "react";
import {Link} from "react-router-dom";

const LinkCardSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <Link className="bg-gray-100 p-6 rounded-lg shadow-lg text-center" to={"/learning"}>
                <div className="text-5xl text-traditionalBlue mb-4">📘</div>
                <h3 className="text-xl font-bold mb-2">단어 학습</h3>
                <p className="text-gray-700">
                    8,000개 이상의 단어와 예문을 통해 어휘력을 키우세요.
                </p>
            </Link>
            {/* 카드 2 */}
            <Link className="bg-gray-100 p-6 rounded-lg shadow-lg text-center" to={"/test"}>
                <div className="text-5xl text-traditionalBlue mb-4">🖋️</div>
                <h3 className="text-xl font-bold mb-2">테스트</h3>
                <p className="text-gray-700">
                    여러 유형의 테스트 중 원하는 테스트를 선택해서 일본어 실력을 키워보세요.
                </p>
            </Link>
            {/*/!* 카드 3 *!/*/}
            {/*<Link className="bg-gray-100 p-6 rounded-lg shadow-lg text-center" to={"/dailyTest"}>*/}
            {/*    <div className="text-5xl text-traditionalBlue mb-4">🔍</div>*/}
            {/*    <h3 className="text-xl font-bold mb-2">데일리 테스트</h3>*/}
            {/*    <p className="text-gray-700">*/}
            {/*        매일 연습을 통해서 일본어 실력을 키워보세요.*/}
            {/*    </p>*/}
            {/*</Link>*/}
        </div>
    );
};

export default LinkCardSection;