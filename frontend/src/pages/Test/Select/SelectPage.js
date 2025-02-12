import MainHeader from "../../../components/Header/MainHeader";
import Footer from "../../../components/Footer/Footer";
import TestSelection from "./TestSelection";
import {useParams} from "react-router-dom";
import OrderPage from "../Order/OrderPage";
import TestHeader from "../../../components/Header/TestHeader";

const SelectPage = () => {
    const { type } = useParams();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {
                type ? (
                    <>
                        <TestHeader/>
                        <OrderPage/>
                    </>
                ) : (
                    <>
                        <MainHeader/>
                        <TestSelection/>
                    </>
                )
            }
            <Footer/>
        </div>
    );
};

export default SelectPage;