import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useSurveyor = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('asking or checking is Surveyor', user)
            const res = await axiosPublic.get(`/users/surveyor/${user.email}`);
            // console.log(res.data);
            return res.data?.surveyor;
        }
    })
    return [isSurveyor, isSurveyorLoading]
};

export default useSurveyor;

