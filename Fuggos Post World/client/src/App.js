import './App.css';

import {Route, Routes, BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Information from "./Information";
import Login from "./Login";
import PostPage from "./PostPage";
import HighScores from "./HighScores";

  function App() {
  return (
      <>
          <div className="holder">
              <BrowserRouter>
                  <NavBar />
                  <Routes>
                      <Route path="/" element={ <Home /> } />
                      <Route path="/home" element={ <Home /> } />

                      <Route path="/b" element={ <HighScores contentPage={0}/>} />
                      <Route path="/post/:id" element={<PostPage />} />
                      <Route path="/login" element={ <Login /> } />
                      <Route path="/about" element={ <Information /> } />
                  </Routes>
              </BrowserRouter>
          </div>
      </>
  );
}

export default App;
