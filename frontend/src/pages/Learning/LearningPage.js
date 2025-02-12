import MainHeader from "../../components/Header/MainHeader";
import Footer from "../../components/Footer/Footer";
import LearningSection from "./LearningSection";

const LearningPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <MainHeader/>
            <LearningSection/>
            <Footer/>
        </div>
    );
};

export default LearningPage;