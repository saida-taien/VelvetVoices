import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const fetchFeaturedSurveys = async (axiosPublic) => {
    const response = await axiosPublic.get('/featured-surveys');
    return response.data;
};

const FeaturedSurveys = () => {
    const axiosPublic = useAxiosPublic();
    const { data: featuredSurveys, error, isLoading } = useQuery({
        queryKey: ['featuredSurveys'],
        queryFn: () => fetchFeaturedSurveys(axiosPublic),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto py-6 px-4 my-20">
            <h2 className="text-2xl font-semibold sm:text-4xl font-sedan text-blue-950 my-10">Featured Surveys 🌟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSurveys.map(survey => (
                    <div key={survey._id} className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">{survey.title}</h3>
                        <p className="text-gray-700 mb-4">{survey.description}</p>
                        <p className="text-sm text-gray-500 mb-2"><strong>Category:</strong> {survey.category}</p>
                        <p className="text-sm text-gray-500 mb-2"><strong>Total Votes:</strong> {survey.votes}</p>
                        <p className="text-sm text-gray-500"><strong>Deadline:</strong> {new Date(survey.deadline).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSurveys;
