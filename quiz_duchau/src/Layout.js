import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManagerUser from "./components/Admin/Content/ManagerUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import React, {Suspense} from "react";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      <h1>404 Not Found</h1>
    </div>
  );
}

const Layout = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<PrivateRoute><ListQuiz /></PrivateRoute>} />
            
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={<PrivateRoute>
          <Admin />
        </PrivateRoute>}>
          <Route index element={<DashBoard />} />
          <Route path="manager-users" element={<ManagerUser />} />
          <Route path="manager-quizzes" element={<ManageQuiz />} />
          <Route path="manager-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
   </Suspense>
  );
};
export default Layout;
