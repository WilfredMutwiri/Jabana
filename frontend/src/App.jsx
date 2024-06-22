import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
// import Signup from "./components/signup"
import SignIn from "./components/Signin"
import AdminDashboard from "./components/AdminDashboard"
import NavBar from "./components/NavBar"
import Footer from "./components/FooterComp"
import Landing from "./components/Landing"
function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/Landing" element={<Landing/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
