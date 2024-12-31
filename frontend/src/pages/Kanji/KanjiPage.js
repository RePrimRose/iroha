import {useParams} from "react-router-dom";
import KanjiSelection from "./KanjiSelection";
import KanjiData from "./KanjiData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const KanjiPage = () => {
    const { level } = useParams();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header/>
            {
                level ? (
                    <KanjiData/>
                ) : (
                    <KanjiSelection/>
                )
            }
            <Footer/>
        </div>
    );
};

export default KanjiPage;