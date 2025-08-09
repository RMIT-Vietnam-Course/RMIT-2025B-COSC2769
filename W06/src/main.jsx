// Core.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Pages.
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Product from "./pages/Product"
import Products from "./pages/Products"
import ProductIndex from "./pages/ProductIndex"

// React Router.
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// React Redux.
import { Provider } from 'react-redux'
import { store } from './redux/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/products",
    element: <Products />,
    children: [
      {
        index: true,
        element: <ProductIndex />,
      },
      {
        path: ":productID",
        element: <Product />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)