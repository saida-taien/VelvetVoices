import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1  className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/dashboard/admin/users" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600">
                    Manage Users
                </Link>
                <Link to="/dashboard/admin/surveys" className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600">
                    Manage Surveys
                </Link>
                <Link to="/dashboard/admin/payments" className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600">
                    View Payments and surveys
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
