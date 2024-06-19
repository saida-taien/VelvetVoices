import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSurveys from '../../hooks/useSurveys';

const Surveys = () => {
    const [category, setCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [surveys] = useSurveys();

    const filteredSurveys = surveys.filter((survey) => {
        return category === '' || survey.category === category;
    });

    const sortedSurveys = filteredSurveys.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.votes - b.votes;
        } else {
            return b.votes - a.votes;
        }
    });

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Surveys</h1>

            <div className="flex justify-between mb-4">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Programming">Programming</option>
                    <option value="Technology">Technology</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="desc">Most Votes</option>
                    <option value="asc">Least Votes</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedSurveys.map((survey) => (
                    <Link key={survey._id} to={`/surveyDetails/${survey._id}`} className="block">
                        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                            <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
                            <p className="text-gray-700 mb-4">{survey.description}</p>
                            <div className="text-sm text-gray-500">
                                <p>Category: {survey.category}</p>
                                <p>Votes: {survey.votes}</p>
                                <p>Deadline: {new Date(survey.deadline).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Surveys;
