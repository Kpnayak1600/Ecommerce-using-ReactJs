import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router, // Import BrowserRouter with an alias
  Routes,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
const App = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setToken={(e) => setToken(e)} token={token} />}
        />
        {token.length > 0 ? (
          <Route
            path="/home"
            element={<Home setToken={(e) => setToken(e)} token={token} />}
          />
        ) : (
          <Route path="*" element={<Error />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
