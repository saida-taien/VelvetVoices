import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await axiosPublic.get('/surveys');
                setSurveys(response.data);
            } catch (error) {
                console.error('Error fetching surveys:', error);
            }
        };

        fetchSurveys();
    }, [axiosPublic]);

    return [surveys];
};

export default useSurveys;
