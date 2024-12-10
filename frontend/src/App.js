import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
