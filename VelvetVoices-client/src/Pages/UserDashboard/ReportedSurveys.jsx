import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const ReportedSurveys = () => {
    const [reportedSurveys, setReportedSurveys] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchReportedSurveys = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`https://velvet-voices-server.vercel.app/reports/${user.email}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch reported surveys');
                    }
                    const data = await response.json();
                    // console.log('Fetched reported surveys:', data); // Logging fetched data
                    setReportedSurveys(data);
                } catch (error) {
                    console.error('Error fetching reported surveys:', error);
                }
            }
        };

        fetchReportedSurveys();
    }, [user?.email]);

    if (!user) {
        return <div>Please log in to see your reported surveys.</div>;
    }

    return (
        <div className="container mx-auto p-6 font-rubik">
            <h1 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Reported Surveys</h1>
            {reportedSurveys.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Survey Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Reported At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedSurveys.map(survey => (
                            <tr key={survey._id}>
                                <td className="py-2 px-4 border-b">{survey.title}</td>
                                <td className="py-2 px-4 border-b">{survey.description}</td>
                                <td className="py-2 px-4 border-b">{survey.category}</td>
                                <td className="py-2 px-4 border-b">{new Date(survey.reportedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No reported surveys found.</div>
            )}
        </div>
    );
};

export default ReportedSurveys;
