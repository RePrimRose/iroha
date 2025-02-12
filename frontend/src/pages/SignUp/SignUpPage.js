import React from "react";
import MainHeader from "../../components/Header/MainHeader";
import Footer from "../../components/Footer/Footer";
import SignUpSection from "./SignUpSection";

const SignUpPage = () => {
    return (
        <div>
            <MainHeader></MainHeader>
            <SignUpSection></SignUpSection>
            <Footer></Footer>
        </div>
    );
}

export default SignUpPage;