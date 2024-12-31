import React from "react";
import Header from "../../components/Header/Header";
import MainSection from "./MainSection";
import AdditionalSection from "./AdditionalSection";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onAuthStatus={setIsAuthenticated}></Header>
            <MainSection></MainSection>
            <AdditionalSection isAuthenticated={isAuthenticated}></AdditionalSection>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;