import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchSurveyResponses = (id) => {
    const axios = useAxiosPublic();

    const fetchSurveyResponses = async ({ queryKey }) => {
        const [{ id }] = queryKey;
        const response = await axios.get(`/dashboard/admin/surveys/${id}/responses`);
        return response.data;
    };

    return useQuery({
        queryKey: [{ id }],
        queryFn: fetchSurveyResponses,
    });
};

export default useFetchSurveyResponses;
