import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FcSurvey } from "react-icons/fc";
import { MdReportProblem } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { MdPayments } from "react-icons/md";
import { FaComment } from "react-icons/fa";
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    // console.log(isAdmin);
    return (
        <div>
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-blue-50">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-blue-200 text-base-content">
                        {
                            isAdmin ? <>
                                <Link to="/dashboard/admin"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><FaHome /> Admin Home</a></li></Link>
                                <Link to="/dashboard/admin/users"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><FaUsers /> Manage Users</a></li></Link>
                                <Link to="/dashboard/admin/surveys"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><SiGoogletagmanager /> Manage Surveys</a></li></Link>
                                <Link to="/dashboard/admin/payments"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><MdPayments /> Payments</a></li></Link>
                            </> :
                                isSurveyor ? <>
                                    <Link to="/dashboard/surveyor"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><FaHome /> Home</a></li></Link>
                                    <Link to="/dashboard/surveyor/create"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><IoIosCreate /> Create Survey</a></li></Link>
                                    <Link to="/dashboard/surveyor/surveys"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><FcSurvey /> View Surveys</a></li></Link>
                                </> : <>
                                    <Link to="/dashboard/user/vote"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><RiSurveyFill /> Participate Surveys</a></li></Link>
                                    <Link to="/dashboard/user/reports"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><MdReportProblem /> Reported Survey</a></li></Link>
                                    <Link to="/dashboard/user/pro-comments"><li><a className="flex items-center gap-2 text-2xl text-blue-950 font-bold"><FaComment />
                                        Commented Surveys</a></li></Link>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
