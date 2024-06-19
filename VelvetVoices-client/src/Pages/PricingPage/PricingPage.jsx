import { Link } from "react-router-dom";

const PricingPage = () => {
    return (
        <div className='border rounded-3xl py-6 my-10 px-20 shadow-xl bg-blue-100'>
            <h1 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">Pricing</h1>
            <div className="flex justify-center">
                <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Pro User</h2>
                            <p className="text-gray-600">Perfect for getting started</p>
                            <p className="text-2xl font-bold text-gray-800 mt-2">$9.99</p>
                            <p className="text-gray-600">per month</p>
                        </div>
                        <ul className="text-sm text-left text-gray-600">
                            <li className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.293 16.707a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414L10 13.586l-4.293-4.293a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0z" clipRule="evenodd" />
                                </svg>
                                Access to basic features
                            </li>
                            <li className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.293 16.707a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414L10 13.586l-4.293-4.293a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0z" clipRule="evenodd" />
                                </svg>
                                comment on surveys
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 px-6 py-4">
                        <Link to="/dashboard/payment"><button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Pay for pro</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
