import {useParams} from "react-router-dom";
import KanjiSelection from "./KanjiSelection";
import KanjiList from "./KanjiList";
import MainHeader from "../../components/Header/MainHeader";
import Footer from "../../components/Footer/Footer";
import KanjiData from "./KanjiData";

const KanjiPage = () => {
    const { level, kanji } = useParams();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <MainHeader/>
            {
                level ? (
                    kanji ? <KanjiData/> : <KanjiList/>
                ) : (
                    <KanjiSelection/>
                )
            }
            <Footer/>
        </div>
    );
};

export default KanjiPage;