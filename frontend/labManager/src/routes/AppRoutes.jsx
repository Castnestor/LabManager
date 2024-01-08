import { Routes,Route } from 'react-router-dom';
import Register from '../pages/Register';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import UserList from '../pages/UserList';
import ClientList from '../pages/ClientList';
import Test from '../pages/test';

function AppRoutes (props) {
    return(
        <Routes>

            <Route index element={<LandingPage {...props}/>}/>

            <Route path="/register" element={<Register {...props}/>}/>

            <Route path="/login" element={<Login {...props}/>}/>

            <Route path="/users" element={<UserList {...props}/>}/>

            <Route path='/clients' element={<ClientList {...props}/>}/>

            <Route path='/test' element={<Test {...props}/>}/>

        </Routes>
    )
}

export default AppRoutes;