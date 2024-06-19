import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateSurvey = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: survey, isLoading, error } = useQuery({
        queryKey: ['survey', id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/surveys/${id}`);
            return response.data;
        }
    });

    const mutation = useMutation(
        {
            queryKey: ['updateSurvey', id],
            mutationFn: async (updatedSurvey) => {
                const response = await axiosPublic.put(`/surveys/${id}`, updatedSurvey);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['survey', id]);
                navigate('/dashboard/surveyor/surveys');
            }
        }
    );

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        if (survey) {
            setTitle(survey.title);
            setDescription(survey.description);
            setCategory(survey.category);
            setDeadline(survey.deadline);
        }
    }, [survey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedSurvey = { title, description, options: ['yes', 'no'], category, deadline };
        mutation.mutate(updatedSurvey);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading survey</div>;

    return (

        <div className='border rounded-3xl py-6 px-20 shadow-xl bg-blue-100'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Update Survey</h2>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <div>
                    <label className='font-bold text-xl text-blue-950'>Title</label>
                    <input type="text" value={title} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>

                    <div className="mb-4">
                        <label className='font-bold text-xl text-blue-950'>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} required
                            className="w-full p-2 border rounded"

                        ></textarea>
                    </div>
                </div>
                <div>
                    <label className='font-bold text-xl text-blue-950'>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required className=" input-bordered w-full max-w-xs p-2 rounded-2xl">
                        <option value="Health">Health</option>
                        <option value="Technology">Technology</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div>
                    <label className='font-bold text-xl text-blue-950 mr-5'>Deadline</label>
                    <input className='p-2' type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </div>
                <button type="submit" className='btn bg-blue-400 w-full text-xl font-bold mt-5'>Update Survey</button>
            </form>
        </div>
    );
};

export default UpdateSurvey;
