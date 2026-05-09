import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import {
  useState,
  useEffect,
} from "react"

import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import SeatSelection from "./pages/SeatSelection"
import Payment from "./pages/Payment"
import Success from "./pages/Success"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Theatres from "./pages/Theatres"
import FoodSelection from "./pages/FoodSelection"
import MyBookings from "./pages/MyBookings"
import Admin from "./pages/Admin"

function App() {

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem(
        "theme"
      ) !== "light"

    )

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      )

      localStorage.setItem(
        "theme",
        "dark"
      )

    } else {

      document.documentElement.classList.remove(
        "dark"
      )

      localStorage.setItem(
        "theme",
        "light"
      )

    }

  }, [darkMode])

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/seat/:id"
          element={
            <SeatSelection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/payment"
          element={
            <Payment
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        
        <Route
          path="/success"
          element={
            <Success
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
  
        <Route
          path="/login"
          element={
            <Login
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/theatres"
          element={
            <Theatres
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/food"
          element={
            <FoodSelection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        
        <Route
          path="/my-bookings"
          element={
            <MyBookings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        
        <Route
          path="/admin"
          element={
            <Admin
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        
      </Routes>

    </BrowserRouter>

  )
}

export default App