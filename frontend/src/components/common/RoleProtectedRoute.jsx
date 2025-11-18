import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleProtectedRoute({ allowedRoles }) {
    const user = useSelector((state) => state.user.user);

    if (!user) return <Navigate to="/login" replace />;

    // If user role NOT allowed → block access
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/lectures" replace />;
        // instructor → redirect to lectures
    }

    return <Outlet />;
}
