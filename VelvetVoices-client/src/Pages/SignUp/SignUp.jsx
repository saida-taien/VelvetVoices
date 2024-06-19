import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleSignUp = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

        if (password.length < 6) {
            toast.warning("Password should be at least 6 characters or longer!");
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.warning("Your password should have at least one uppercase character!");
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.warning("Your password should have at least one lowercase character!");
            return;
        }

        try {
            const result = await createUser(email, password);
            await logOut();

            // Navigate to sign-in page
            navigate(location?.state ? location.state : '/signIn');

            // Update profile
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photo,
            });

            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                photo: photo,   // Include photo if needed
                role: 'user'    // Set user role as 'user'
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                toast.success("User created successfully.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="bg-blue-100 py-10">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-transparent rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <section className="bg-transparent pb-3">
                    <div className="container flex items-center justify-center px-6 mx-auto">
                        <form onSubmit={handleSignUp} className="w-full max-w-md">
                            <div className="flex gap-6 items-center justify-center mt-6">
                                <Link to='/signIn'>
                                    <a className="w-1/3 pb-4 font-medium text-center text-blue-900 capitalize border-b dark:border-gray-400 text-lg">
                                        Sign In
                                    </a>
                                </Link>
                                <Link to='/signUp'>
                                    <a className="w-1/3 pb-4 font-medium text-center text-blue-900 capitalize border-b-2 border-blue-500 dark:border-blue-400 text-lg">
                                        Sign Up
                                    </a>
                                </Link>
                            </div>

                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input type="text" name="name" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" required />
                            </div>

                            <div className="relative flex items-center mt-8">
                                <span className="absolute px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </span>
                                <input type="text" name="photo" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Profile Photo" required />
                            </div>

                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input name="email" type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input name="password" type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                            </div>

                            <div className="mt-6">
                                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign Up
                                </button>
                                <div className="mt-6 text-center">
                                    <Link to='/signIn'>
                                        <a className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                            Already have an account?
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mx-20 bg-blue-300 rounded-2xl">
                        <SocialLogin />
                    </div>
                </section>

                <div className="hidden bg-cover lg:block lg:w-1/2">
                    <img src="https://i.ibb.co/BCr5Hnj/11436091-4707071.jpg" alt="" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
