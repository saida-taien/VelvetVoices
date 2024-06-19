import { Link } from 'react-router-dom';
import logo from '/velvet.png'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSurveyor from '../../hooks/useSurveyor';
const Navbar = () => {
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks = <>
    <Link to='/'><li className='text-blue-900 font-sedan font-bold text-xl'><a>Home</a></li></Link>
    <Link to='/surveys'><li className='text-blue-900 font-sedan font-bold text-xl'><a>Surveys</a></li></Link>
    {
        isAdmin ? <Link to='dashboard/admin'><li className='text-blue-900 font-sedan font-bold text-xl'><a>Admin Dashboard</a></li></Link> : 
        
        isSurveyor ? <Link to='dashboard/surveyor'><li className='text-blue-900 font-sedan font-bold text-xl'><a>Surveyor Dashboard</a></li></Link> : 

        <Link to='dashboard/user'><li className='text-blue-900 font-sedan font-bold text-xl'><a> user Dashboard</a></li></Link>
        
    }
    <Link to='/pricingPage'><li className='text-yellow-500  font-sedan font-bold text-xl'><a>Pro User</a></li></Link>
    </>
    return (
        <div className="navbar bg-blue-200 z-10 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                 <a><img className="h-20" src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul tabIndex={0} className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">


                {
                    user ?
                        <div className="user-info flex justify-center items-center gap-4">
                            <div className="lg:tooltip" data-tip={user.displayName}>
                                <div className="avatar">
                                    <div className="md:w-10 w-5 rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                            </div>

                            <a onClick={handleLogOut} className="btn hover:text-blue-950 mr-3 bg-blue-950 border-0  text-white">Logout</a>
                        </div> :
                        <div>
                            <Link to='/signIn'><a className="btn hover:text-blue-950 mr-3 bg-blue-950 border-0  text-white">Signin</a>
                            </Link>
                            <Link to='/signUp'><button className="btn hover:text-blue-950 mr-3 bg-blue-950 border-0  text-white">Signup</button></Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;