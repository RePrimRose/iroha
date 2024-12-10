import React from "react";
import Header from "../../components/Header/Header";
import MainSection from "./MainSection";
import AdditionalSection from "./AdditionalSection";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
    return (
        <div>
            <Header></Header>
            <MainSection></MainSection>
            <AdditionalSection></AdditionalSection>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;