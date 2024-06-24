import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/LandingPage";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
