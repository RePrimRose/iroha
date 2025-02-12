import React from "react";
import MainHeader from "../../components/Header/MainHeader";
import Footer from "../../components/Footer/Footer";
import LoginSection from "./LoginSection";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <MainHeader></MainHeader>
            <LoginSection></LoginSection>
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;