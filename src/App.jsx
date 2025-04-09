import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import Tool_Lib from "./Components/Tool_Lib";
import Languages from "./Components/Languages";
import TimeLine from "./Components/TimeLine.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Languages />} />
          <Route path='/Frameworks' element={<Frameworks />} />
          <Route path='/Frameworks/ToLib' element={<Tool_Lib />} />
          <Route path='/TimeLine' element={<TimeLine />} />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
};

export default App;
