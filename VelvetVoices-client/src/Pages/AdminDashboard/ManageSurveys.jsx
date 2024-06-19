import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageSurveys = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const fetchSurveys = async () => {
        const res = await axiosPublic.get('/surveys');
        return res.data;
    };

    const { data: surveys = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    const updateSurveyStatus = async ({ id, published }) => {
        await axiosPublic.put(`/dashboard/admin/surveys/${id}/publish`, { published });
    };

    const mutation = useMutation({
        mutationFn: updateSurveyStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(['surveys']);
        },
    });

    const handlePublish = (id, published) => {
        mutation.mutate({ id, published });
    };

    return (
        <div  className='border rounded-3xl py-6 px-20 shadow-xl bg-blue-100 font-rubik my-10'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Manage Surveys</h2>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className='font-bold text-xl text-blue-900'>Title</th>
                        <th className='font-bold text-xl text-blue-900'>Published</th>
                        <th className='font-bold text-xl text-blue-900'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map(survey => (
                        <tr key={survey._id}>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{survey.title}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{survey.published ? 'Yes' : 'No'}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>
                                <button onClick={() => handlePublish(survey._id, !survey.published)}>
                                    {survey.published ? 'Unpublish' : 'Publish'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSurveys;
