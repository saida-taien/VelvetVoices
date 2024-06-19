import { Link } from "react-router-dom";

const SurveyorDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Surveyor Dashboard</h1>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center ">
                <Link to="/dashboard/surveyor/create" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600">
                    Create Survey
                </Link>
                <Link to="/dashboard/surveyor/surveys" className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600">
                    View Surveys
                </Link>
            </div>
        </div>
    );
};

export default SurveyorDashboard;
