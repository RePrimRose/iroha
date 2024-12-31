import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LearningSection from "./LearningSection";

const LearningPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header/>
            <LearningSection/>
            <Footer/>
        </div>
    );
};

export default LearningPage;