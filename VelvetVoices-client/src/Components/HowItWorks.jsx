import { SiGnuprivacyguard } from "react-icons/si";
import { MdTravelExplore } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SiPiapro } from "react-icons/si";
const HowItWorks = () => {
    return (
        <div className="py-12 bg-blue-100">
            <h2 className="text-3xl font-bold text-center mb-8 font-sedan">How It Works</h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex  items-center gap-1"><SiGnuprivacyguard /> Sign Up</h3>
                        <p className="text-gray-700 text-justify">Create an account quickly and easily. Join our community to start participating in or creating insightful surveys.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </span>
                </div>

                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><MdTravelExplore /> Explore Surveys</h3>
                        <p className="text-gray-700 text-justify">Browse through a wide variety of surveys on different topics. Filter and sort to find surveys that interest you most.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><FaCommentDots /> Share Your Opinion</h3>
                        <p className="text-gray-700 text-justify">Participate in surveys and share your honest opinions. Your feedback is valuable and helps shape the outcomes.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><IoIosCreate /> Create Surveys</h3>
                        <p className="text-gray-700 text-justify">Become a surveyor and create your own surveys. Customize questions, set deadlines, and publish to gather insights from others.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><IoAnalyticsOutline /> Analyze Results</h3>
                        <p className="text-gray-700 text-justify">View detailed results and visual analytics for your surveys. Understand trends, preferences, and opinions through charts and tables.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-1"><SiPiapro /> Upgrade for More</h3>
                        <p className="text-gray-700 text-justify">Become a Pro-User to unlock advanced features like adding comments, accessing detailed analytics, and more.</p>
                    </div>
                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
