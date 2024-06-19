import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useProUser = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, 'isProUser'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('asking or checking is pro-user', user)
            const res = await axiosPublic.get(`/users/pro-user/${user.email}`);
            // console.log(res.data);
            return res.data?.proUser;
        }
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;