import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import About from './About/About';
import TestimonialsSection from './Testimonial/TestimonialsSection';
import NewsletterSection from './Newsletter/NewsletterSection';
import TeamSection from './TeamSection/TeamSection';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <TestimonialsSection></TestimonialsSection>
            <NewsletterSection></NewsletterSection>
            <TeamSection></TeamSection>
        </div>
    );
};

export default Home;