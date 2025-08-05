import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

export default function AuthStatus() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogin = () => {
        const user = { name: 'Tester', email: 'tester@test.com' };
        dispatch(login(user));
    };

    const handleLogout = () => dispatch(logout());

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <p>Welcome, {user.name}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}