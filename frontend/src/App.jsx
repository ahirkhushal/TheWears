import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import Signup from "./features/signup/Signup";
import Home from "./features/Home/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
