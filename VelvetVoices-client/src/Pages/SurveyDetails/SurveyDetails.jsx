import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { ToastContainer, toast } from 'react-toastify';
import useProUser from '../../hooks/useProUser';

const fetchSurveyDetails = async (axiosPublic, id) => {
    const response = await axiosPublic.get(`/surveys/${id}`);
    return response.data;
};

const fetchComments = async (axiosPublic, surveyId) => {
    const response = await axiosPublic.get(`/comments/${surveyId}`);
    return response.data;
};

const postVote = async ({ axiosPublic, id, vote, userEmail, userName }) => {
    const response = await axiosPublic.post('/surveys/vote', { id, vote, userEmail, userName });
    return response.data;
};

const postComment = async ({ axiosPublic, id, userEmail, userName, comment }) => {
    const response = await axiosPublic.post('/comments', { surveyId: id, userEmail, userName, comment });
    return response.data;
};

const SurveyDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [vote, setVote] = useState('');
    const [comment, setComment] = useState('');
    const [isProUser] = useProUser();
    // console.log(isProUser);
    const { data: survey, error: surveyError, isLoading: surveyLoading } = useQuery({
        queryKey: ['survey', id],
        queryFn: () => fetchSurveyDetails(axiosPublic, id)
    });
    const { data: comments, error: commentsError, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(axiosPublic, id)
    });

    const voteMutation = useMutation({
        mutationFn: ({ id, vote, userEmail, userName }) => postVote({ axiosPublic, id, vote, userEmail, userName }),
        onSuccess: () => {
            queryClient.invalidateQueries(['survey', id]);
        }
    });

    const commentMutation = useMutation({
        mutationFn: ({ id, userEmail, userName, comment }) => postComment({ axiosPublic, id, userEmail, userName, comment }),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', id]);
        }
    });

    const handleVote = () => {
        voteMutation.mutate({ id, vote, userEmail: user.email, userName: user.displayName });
    };

    const handleCommentSubmit = () => {
        if (user.role !== 'pro-user') {
            toast.error("Only pro-users can comment on surveys.");
            return;
        }
        commentMutation.mutate({ id, userEmail: user.email, userName: user.displayName, comment });
        setComment('');
    };

    const handleReport = async () => {
        toast.warn("Report submitted successfully !!");
        const email = user?.email;
        if (!email) {
            console.error("User email is not available.");
            return;
        }

        const newReport = { email, id };
        try {
            const response = await fetch(`https://velvet-voices-server.vercel.app/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReport)
            });
            const data = await response.json();
            // console.log('Report submitted successfully:', data);
            if (data?.insertedId) {
                toast.warn("Report submitted successfully !!");
            }
        } catch (error) {
            console.error('Error reporting survey:', error.message);
        }
    };

    if (surveyLoading || commentsLoading) {
        return <div>Loading...</div>;
    }

    if (surveyError) {
        return <div>Error: {surveyError.message}</div>;
    }

    if (commentsError) {
        return <div>Error: {commentsError.message}</div>;
    }

    return (
        <div className='container mx-auto flex justify-center rounded-3xl py-6 px-20 shadow-xl bg-blue-50'>
            <div className="p-6 h-screen">
                <h1 className="text-3xl font-bold mb-4">{survey.title}</h1>
                <p className="text-blue-700 font-bold mb-2">{survey.description}</p>
                <div className="text-sm text-gray-500 mb-2">
                    <p className='font-semibold text-sm font-rubik text-gray-950 mr-3'><strong>Category: </strong> {survey.category}</p>
                    <p className='font-semibold text-sm font-rubik text-gray-950 mr-3'><strong>Total Votes: </strong> {survey.votes}</p>
                    <p className='font-semibold text-sm font-rubik text-gray-950 mr-3'><strong>Deadline: </strong> {new Date(survey.deadline).toLocaleString()}</p>
                </div>

                {user ? (
                    !voteMutation.isSuccess ? (
                        <div>
                            <label>
                                <input type="radio" value="yes" checked={vote === 'yes'} onChange={() => setVote('yes')} className='ml-2'/>
                                Yes
                            </label>
                            <label>
                                <input type="radio" value="no" checked={vote === 'no'} onChange={() => setVote('no')} />
                                No
                            </label>
                            <button onClick={handleVote} className="mt-4 ml-5 px-4 py-2 bg-blue-500 text-white rounded">Submit Vote</button>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <Chart
                                type="bar"
                                data={{
                                    labels: ['Yes', 'No'],
                                    datasets: [{
                                        label: '# of Votes',
                                        data: [survey.yesVotes, survey.noVotes],
                                        backgroundColor: ['#4caf50', '#f44336'],
                                    }],
                                }}
                            />
                        </div>
                    )
                ) : (
                    <p className="text-red-500">Please log in to vote.</p>
                )}

                <button onClick={handleReport} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Report Survey</button>

                {user && isProUser && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        <div className="mb-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="border p-2 mb-2">
                                    <p><strong>{comment.userName}</strong>: {comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border rounded" rows="4"></textarea>
                        <button onClick={handleCommentSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Comment</button>
                    </div>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SurveyDetails;
