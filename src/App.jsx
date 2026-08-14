import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body"
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div data-theme="dark">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <div
        
        className="min-h-screen bg-base-100 text-base-content"
      >
        <h2 className="font-bold">Hello World</h2>
      </div>
    </div>
  );
}

export default App;
