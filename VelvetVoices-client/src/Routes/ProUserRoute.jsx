import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useProUser from "../hooks/useProUser";


const ProUserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isProUser, isProUserLoading] = useProUser();
    const location = useLocation();

    if (loading || isProUserLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isProUser) {
        return children;
    }

    return <Navigate to="/pricingPage" state={{from: location}} replace></Navigate>

};

export default ProUserRoute;