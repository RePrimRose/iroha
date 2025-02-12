import {useParams} from "react-router-dom";
import MainHeader from "../../components/Header/MainHeader";
import Footer from "../../components/Footer/Footer";
import WordData from "./WordData";
import WordList from "./WordList";
import WordSelection from "./WordSelection";

const WordPage = () => {
    const {level, word} = useParams();

    return(
        <div className="min-h-screen flex flex-col bg-gray-100">
            <MainHeader/>
            {
                level ? (
                    word ? <WordData/> : <WordList/>
                ) : (
                    <WordSelection/>
                )
            }
            <Footer/>
        </div>
    );
};

export default WordPage;