import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Summary from './pages/Summary'
import History from './pages/History'
import Honorable from './pages/Honorable'
import Experience from './pages/Experience'
import ActivitySummary from './pages/ActivitySummary'
import ProfilePage from './pages/ProfilePage'
import AppNavbar from './components/AppNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
  const isSuccess = useSelector((state) => state.users.isSuccess)
  return (
    <div className="App bgImage">
        <Router>
            <AppNavbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/summary' element={<Summary />} />
                <Route path='/history' element={<History />} />
                <Route path='/honorable' element={<Honorable />} />
                <Route path='/experience' element={<Experience />} />
                <Route path='/activity' element={<ActivitySummary />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
        <ToastContainer />
    </div>
  )
}

export default App;
