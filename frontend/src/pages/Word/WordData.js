import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const WordData = () => {
    const token = localStorage.getItem('token');
    const {word} = useParams();
    const [wordData, setWordData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/word/detatl', {
                    params: {
                        word: word
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setWordData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [word]);

    if (!wordData) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold mb-4">{wordData.word}</h1>

            <div className="p-6 bg-white shadow-md rounded-lg w-3/4">

            </div>

            <hr className="my-4 border-t border-gray-300"/>
        </div>
    );
};

export default WordData;