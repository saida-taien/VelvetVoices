import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FiEdit } from "react-icons/fi";
const ViewSurveys = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: surveys, isLoading, error } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const response = await axiosPublic.get('/surveys');
            return response.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading surveys</div>;

    return (
        <div>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Surveys</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='font-bold text-xl text-blue-900'>Title</th>
                            <th className='font-bold text-xl text-blue-900'>Category</th>
                            <th className='font-bold text-xl text-blue-900'>Deadline</th>
                            <th className='font-bold text-xl text-blue-900'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey) => (
                            <tr key={survey._id}>
                                <td className='font-semibold text-sm font-rubik text-blue-950'>{survey.title}</td>
                                <td className='font-semibold text-sm font-rubik text-blue-950'>{survey.category}</td>
                                <td className='font-semibold text-sm font-rubik text-blue-950'>{new Date(survey.deadline).toLocaleDateString()}</td>
                                <td className='font-semibold text-sm font-rubik text-blue-950'>
                                    <button className='bg-blue-200 p-2 rounded-3xl' onClick={() => navigate(`/dashboard/surveyor/update/${survey._id}`)}><FiEdit /></button>
                                    <button className='btn bg-blue-200 ml-3' onClick={() => navigate(`/dashboard/surveyor/surveys/${survey._id}`)}>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewSurveys;


