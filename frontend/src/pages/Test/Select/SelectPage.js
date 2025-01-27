import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import TestSelection from "./TestSelection";
import {useParams} from "react-router-dom";
import OrderPage from "../Order/OrderPage";

const SelectPage = () => {
    const { type } = useParams();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {
                type ? (
                    <OrderPage/>
                ) : (
                    <>
                        <Header/>
                        <TestSelection/>
                    </>
                )
            }
            <Footer/>
        </div>
    );
};

export default SelectPage;