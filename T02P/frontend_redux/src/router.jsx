import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/home/Home.jsx';
import Customers from './pages/customer/Customers.jsx';
import CustomerIndex from './pages/customer/CustomerIndex.jsx';
import Customer from './pages/customer/Customer.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'customers',
                element: <Customers />,
                children: [
                    { index: true, element: <CustomerIndex /> },
                    { path: ':customerId', element: <Customer />, }
                ]
            }
        ]
    }
]);

export default router;