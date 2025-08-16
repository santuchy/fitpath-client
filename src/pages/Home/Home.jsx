import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import About from './About/About';
import TestimonialsSection from './Testimonial/TestimonialsSection';
import NewsletterSection from './Newsletter/NewsletterSection';
import TeamSection from './TeamSection/TeamSection';
import LatestForumPosts from './LatestForumPosts/LatestForumPosts';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';
import FAQSection from './FAQSection/FAQSection';


const Home = () => {

    useEffect(() => {
        document.title = "Home | FitPath";
      }, []);
      
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <FeaturedClasses></FeaturedClasses>
            <TestimonialsSection></TestimonialsSection>
            <LatestForumPosts></LatestForumPosts>
            <NewsletterSection></NewsletterSection>
            <TeamSection></TeamSection>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;