import React from 'react'
import { Analytics } from "@vercel/analytics/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import JsFrameworks from './Components/JsFrameworks'
import Tool_Lib from './Components/Tool_Lib'
import Languages from './Components/Languages'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Languages />} />
          <Route path='/Frameworks' exact element={<JsFrameworks />} />
          <Route path='/Frameworks/ToLib' element={<Tool_Lib />} />
        </Routes>
      </Router>
      <Analytics/>
    </>
  )
}

export default App



// continue on jsFramework components and give heading, definition aur busend;