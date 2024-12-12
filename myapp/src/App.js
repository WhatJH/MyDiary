import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Routes 추가
import Login from "./Login";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { MainScreen } from "./MainScreen";
import { getCookie, setCookie } from "./utils/CookiesProvider";
import Join from "./Join";

function App() {
  
  let session = getCookie("user");
  
  useEffect(() => {
    console.log("!!!!!!",session);
   
  }, [])

  
  
  return (
    <Router>
      <div>
        {session ? (
          <Routes>
            <Route path="/diarylist" element={<DiaryList />} />
            <Route path="/create" element={<DiaryEditor />} />
            <Route
              path="/"
              element={
              <MainScreen/>
              }
            />
  

          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login  />}
            />
                  <Route path="/join" element={<Join />} />
                  <Route
              path="/*"
              element={<Login  />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
