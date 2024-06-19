import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { ToastContainer, toast } from 'react-toastify';

const SurveyCreationForm = () => {
    const axiosPublic = useAxiosPublic();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [options] = useState(['yes', 'no']); // predefined options

    const { mutate: createSurvey } = useMutation({
        mutationFn: async (newSurvey) => {
            const response = await axiosPublic.post('/surveys', newSurvey);
            return response.data;
        },
        onSuccess: () => {
            // Handle success, e.g., show a success message, redirect, etc.
            toast.success("Survey Created Successfully")
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Failed to create survey:', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSurvey = {
            title,
            description,
            category,
            deadline: new Date(deadline),
            options,
            status: 'publish',
            createdAt: new Date(),
            yesVotes: 0,
            noVotes: 0,
            votes: 0,
            responses: []
        };
        createSurvey(newSurvey);
    };

    return (
        <div className='border rounded-3xl py-6 px-20 shadow-xl bg-blue-100'>
            <form onSubmit={handleSubmit} className="p-6 font-rubik">
                <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Create Survey</h2>
                <div className="mb-4">
                    <label className='font-bold text-xl text-blue-950'>Title</label>


                    <input type="text" placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" required onChange={(e) => setTitle(e.target.value)} value={title} />


                </div>
                <div className="mb-4">
                    <label className='font-bold text-xl text-blue-950'>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className='font-bold text-xl text-blue-950'>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Programming">Programming</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className='font-bold text-xl text-blue-950'>Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Survey</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SurveyCreationForm;
