import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginSection from "./LoginSection";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header></Header>
            <LoginSection></LoginSection>
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;