import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useSurveyor from "../hooks/useSurveyor";



const SurveyorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSurveyor , isSurveyorLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isSurveyor) {
        return children;
    }

    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>

};

export default SurveyorRoute;
