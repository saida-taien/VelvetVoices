import { useState, useEffect, useContext } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';

const CommentsOfPro = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Fetch comments only for the current logged-in pro user
                const response = await axiosPublic.get(`/comments?userEmail=${user.email}`);
                setComments(response.data);
                // console.log('Fetched comments:', response.data);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        if (user ) {
            fetchComments();
        }
    }, [axiosPublic, user]);

    return (
        <div className='border rounded-3xl py-6 px-20 shadow-xl bg-blue-100'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Comments</h2>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className='font-bold text-xl text-blue-900'>User</th>
                        <th className='font-bold text-xl text-blue-900'>Comment</th>
                        <th className='font-bold text-xl text-blue-900'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment._id}>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{comment.userName}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{comment.comment}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{new Date(comment.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommentsOfPro;
