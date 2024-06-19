import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SurveyDetailsForSurveyor = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: survey, isLoading, error } = useQuery({
        queryKey: ['survey', id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/surveys/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading survey details</div>;

    return (
        <div className='border rounded-3xl py-6 px-20 shadow-xl bg-blue-100'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Survey Details</h2>
            <div className='font-rubik space-y-4'>
                <p><strong>Title:</strong> {survey.title}</p>
                <p><strong>Description:</strong> {survey.description}</p>
                <p><strong>Category:</strong> {survey.category}</p>
                <p><strong>Deadline:</strong> {new Date(survey.deadline).toLocaleDateString()}</p>
            </div>
            {survey.responses && survey.responses.length > 0 ? (
                <div className="overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-4 text-center font-sedan text-blue-950 my-10">Responses</h3>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th className='font-bold text-xl text-blue-900'>Serial No</th>
                                <th className='font-bold text-xl text-blue-900'>User Email</th>
                                <th className='font-bold text-xl text-blue-900'>User Name</th>
                                <th className='font-bold text-xl text-blue-900'>Vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {survey.responses.map((response, index) => (
                                <tr key={index}>
                                    <td  className='font-semibold text-sm font-rubik text-blue-950'>{index + 1}</td>
                                    <td  className='font-semibold text-sm font-rubik text-blue-950'>{response.userEmail}</td>
                                    <td  className='font-semibold text-sm font-rubik text-blue-950'>{response.userName}</td>
                                    <td  className='font-semibold text-sm font-rubik text-blue-950'>{response.vote}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-2xl font-bold mb-4 text-center font-sedan text-red-500 my-10">No responses available</div>
            )}
        </div>
    );
};

export default SurveyDetailsForSurveyor;
