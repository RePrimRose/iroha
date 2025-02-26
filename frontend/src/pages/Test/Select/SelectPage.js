import MainHeader from "../../../components/Header/MainHeader";
import Footer from "../../../components/Footer/Footer";
import {useParams} from "react-router-dom";
import SentenceInOrderPage from "../Detail/SentenceInOrderPage";
import TestHeader from "../../../components/Header/TestHeader";
import KanjiSelectPage from "../Detail/KanjiSelectPage";
import TestSelection from "./TestSelection";

const SelectPage = () => {
    const { type } = useParams();

    const renderPage = () => {
        switch (type) {
            case "sentence-inOrder":
                return <SentenceInOrderPage/>;
            case "kanji-kanji":
                return <KanjiSelectPage/>;
            default:
                return <TestSelection/>;
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {type ? <TestHeader/> : <MainHeader/>}
            {renderPage()}
            <Footer/>
        </div>
    );
};


export default SelectPage;