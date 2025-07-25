import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import About from './About/About';
import TestimonialsSection from './Testimonial/TestimonialsSection';
import NewsletterSection from './Newsletter/NewsletterSection';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <TestimonialsSection></TestimonialsSection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;