import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <nav>
                <h1>Header</h1>
                <ul>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <hr />
        </>
    )
}