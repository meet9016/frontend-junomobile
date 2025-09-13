import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from './pages/routes/ProtectedRoute'
import AppRoutes from './pages/routes/AppRoutes'
import Toaster from './component/Toaster';
import 'react-loading-skeleton/dist/skeleton.css'
function App() {

  return (
    <>
      {/* <Login /> */}
      {/* <Header /> */}
      {/* <SubHeader /> */}
      {/* <SubData /> */}
      {/* <SubDetail />
      <Footer /> */}
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App














































































