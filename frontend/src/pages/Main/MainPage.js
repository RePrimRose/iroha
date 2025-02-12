import React from "react";
import MainHeader from "../../components/Header/MainHeader";
import MainSection from "./MainSection";
import AdditionalSection from "./AdditionalSection";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <MainHeader></MainHeader>
            <MainSection></MainSection>
            <AdditionalSection></AdditionalSection>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;