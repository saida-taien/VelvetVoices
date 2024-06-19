import Banner from "../../Components/Banner";
import FAQ from "../../Components/FAQ";
import FeaturedSurveys from "../../Components/FeaturedSurveys ";
import HowItWorks from "../../Components/HowItWorks";
import LatestSurveys from "../../Components/LatestSurveys ";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSurveys></FeaturedSurveys>
            <LatestSurveys></LatestSurveys>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;