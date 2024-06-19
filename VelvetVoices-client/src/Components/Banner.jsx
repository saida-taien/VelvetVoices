import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="carousel w-full h-[600px]">
        <div className="carousel-item relative w-full">
            <img src="https://i.ibb.co/5r636wM/kobu-agency-7okk-Fhxrx-Nw-unsplash.jpg" className="w-full " />
            <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                <div className='text-white space-y-7 pl-12 w-1/2'>
                    <h2 className='md:text-6xl text-4xl font-bold font-sedan'>SurveyWave: Ride the Tide of Feedback</h2>
                    <p>Welcome to Insight Echoes, where every voice matters. Our platform makes it easy to create, share, and participate in surveys, helping you gather valuable feedback and uncover meaningful insights.</p>
                    <div>
                        <Link to='/surveys'><button className="btn bg-blue-950 text-white border-0 mr-5">Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    );
};

export default Banner;