import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/home/Home.jsx';
import Customers, { customersLoader } from './pages/customer/Customers.jsx';
import CustomerIndex from './pages/customer/CustomerIndex.jsx';
import Customer, { customerLoader } from './pages/customer/Customer.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'customers',
                element: <Customers />,
                loader: customersLoader,
                children: [
                    { index: true, element: <CustomerIndex /> },
                    {
                        path: ':customerId',
                        element: <Customer />,
                        loader: customerLoader
                    }
                ]
            }
        ]
    }
]);

export default router;