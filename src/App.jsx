import { createTheme } from "@mui/material/styles"
import { Routes, Route } from "react-router-dom";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Class from "./components/Class";
import Menu from "./components/Menu";

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/class" element={<Class />} />
      </Routes>
    </>
  );
};

export default App;
