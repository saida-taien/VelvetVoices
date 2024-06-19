import { Link } from "react-router-dom";


const UserDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">User Dashboard</h1>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center ">
                <Link to="/dashboard/user/vote" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600">
                    Participate surveys
                </Link>
                <Link to="/dashboard/user/reports" className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600">
                    Reported Surveys
                </Link>
                <Link to="/dashboard/user/pro-comments" className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600">
                    Commented Surveys
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;