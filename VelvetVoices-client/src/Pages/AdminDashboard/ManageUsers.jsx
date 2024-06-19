import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [filterRole, setFilterRole] = useState('');
    const queryClient = useQueryClient();

    const fetchUsers = async ({ queryKey }) => {
        const [_key, role] = queryKey;
        const res = await axiosPublic.get('/dashboard/admin/users', { params: { role } });
        return res.data;
    };

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', filterRole],
        queryFn: fetchUsers
    });

    const updateUserRole = async ({ id, role }) => {
        await axiosPublic.put(`/dashboard/admin/users/${id}`, { role });
    };

    const mutation = useMutation({
        mutationFn: updateUserRole,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const handleRoleChange = (id, role) => {
        mutation.mutate({ id, role });
    };

    return (
        <div className='border rounded-3xl py-6 my-10 px-20 shadow-xl bg-blue-100'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Manage Users</h2>
            <div>
                <label className='font-bold text-xl text-blue-950'>Filter by Role:</label>
                <select className="w-full p-2 border rounded" onChange={(e) => setFilterRole(e.target.value)} value={filterRole}>
                    <option value="">All</option>
                    <option value="admin">Admin</option>
                    <option value="surveyor">Surveyor</option>
                    <option value="user">User</option>
                    <option value="pro-user">Pro User</option>
                </select>
            </div>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className='font-bold text-xl text-blue-900'>Email</th>
                        <th className='font-bold text-xl text-blue-900'>Role</th>
                        <th className='font-bold text-xl text-blue-900'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{user.email}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{user.role}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>
                                <button className='bg-blue-200 p-2 rounded-3xl btn mr-2' onClick={() => handleRoleChange(user._id, 'admin')}>Admin</button>
                                <button className='bg-blue-200 p-2 rounded-3xl btn mr-2' onClick={() => handleRoleChange(user._id, 'surveyor')}>Surveyor</button>
                                <button className='bg-blue-200 p-2 rounded-3xl btn mr-2' onClick={() => handleRoleChange(user._id, 'user')}>User</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
