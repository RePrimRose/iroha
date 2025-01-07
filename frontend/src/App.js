import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LearningPage from "./pages/Learning/LearningPage";
import KanjiPage from "./pages/Kanji/KanjiPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/learning" element={<LearningPage/>}/>
            <Route path="/kanji/:level?/:kanji?" element={<KanjiPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
