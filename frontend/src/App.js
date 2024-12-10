import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./pages/Main/MainSection";
import AdditionalSection from "./pages/Main/AdditionalSection";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainSection></MainSection>
      <AdditionalSection></AdditionalSection>
      <Footer></Footer>
    </div>
  );
}

export default App;
