import { Routes,Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserList from '../pages/UserList';
import ClientList from '../pages/ClientList';
import Test from '../pages/test';
import SamplesList from '../pages/SampleList';
import AddSamples from '../pages/AddSamples';
import DashBoard from '../pages/DashBoard';
import OrderList from '../pages/Orders';
import ReportsList from '../pages/Reports';
import SamplePage from '../pages/SamplePage'
import TestsPage from '../pages/TestsPage';

function AppRoutes (props) {
    return(
        // creating all the routes
        <Routes>

            <Route index element={<DashBoard {...props}/>}/>

            <Route path="/register" element={<Register {...props}/>}/>

            <Route path="/login" element={<Login {...props}/>}/>

            {/* orders */}
            <Route path='/orders' element={<OrderList {...props}/>}/>

            <Route path='/addsamples' element={<AddSamples {...props}/>}/>

            <Route path='/samples' element={<SamplesList {...props}/>}/>

            {/* Dynamically generated route */}
            <Route path='/samples/info/:id/:sampleNumber/:description' element={<SamplePage {...props}/>}/>

            {/* List of test */}
            <Route path='/tests' element={<TestsPage {...props}/>}/>

            {/* Reports */}
            <Route path='/reports' element={<ReportsList {...props}/>}/>

            <Route path='/test' element={<Test {...props}/>}/>

            <Route path="/users" element={<UserList {...props}/>}/>

            <Route path='/clients' element={<ClientList {...props}/>}/>

        </Routes>
    )
}

export default AppRoutes;