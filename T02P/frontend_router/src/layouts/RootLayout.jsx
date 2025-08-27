import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <>
            <nav>
                <ul className='navbar-nav'>
                    <li>
                        <NavLink className='nav-link' to='/'>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='nav-link' to='/customers'>
                            Customers
                        </NavLink>
                    </li>
                </ul>
            </nav >

            <hr />

            <Outlet />
        </>
    );
}