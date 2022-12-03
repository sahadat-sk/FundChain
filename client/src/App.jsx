import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import OngoingPage from "./pages/Ongoing/OngoingPage";
import CreateFundPage from "./pages/CreateFundPage/CreateFundPage";
import Description from "./pages/Description/Description";
import MyCharites from "./pages/MyCharities/MyCharities"

function App() {
    return (
        <EthProvider>
            <BrowserRouter>
                {/* <Navbar /> */}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/ongoing" element={<OngoingPage/>} />
                    <Route path="/createfund" element={<CreateFundPage/>} />
                    <Route path="/desc/:id" element={<Description/>}/>
                    <Route path="/mycharities" element={<MyCharites/>}/>
                </Routes>
            </BrowserRouter>
        </EthProvider>

        
                
    );
}

export default App;
