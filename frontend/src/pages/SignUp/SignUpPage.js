import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SignUpSection from "./SignUpSection";

const SignUpPage = () => {
    return (
        <div>
            <Header></Header>
            <SignUpSection></SignUpSection>
            <Footer></Footer>
        </div>
    );
}

export default SignUpPage;