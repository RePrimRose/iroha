import React from 'react';
import NormalCardSection from "./NormalCardSection";
import LinkCardSection from "./LinkCardSection";

const AdditionalSection = ({ isAuthenticated }) => {
    return (
        <section className="flex-grow flex flex-col items-center justify-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-traditionalBlue mb-12">
                    주요 기능
                </h2>
                {/* 카드 섹션 */}
                {
                    isAuthenticated ? (
                        <LinkCardSection/>
                    ) : (
                        <NormalCardSection/>
                    )
                }
            </div>
        </section>
    );
};

export default AdditionalSection;
