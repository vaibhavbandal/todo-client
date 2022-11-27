import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Login } from './features/login/Login';
import { LoginGoogle } from './features/loginGoogle/LoginGoogle';
import { Homepage } from './features/Homepage/Homepage';
import Register from './features/register/Register';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {
  return (
      <Routes>

        <Route path='/' element={<Login/>}></Route>
        <Route path='/app' element={ <ProtectedRoute> <Homepage/> </ProtectedRoute> }></Route>
        <Route path='/login-google/:access_token' element={<LoginGoogle/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

      </Routes>
  );
}

export default App;
