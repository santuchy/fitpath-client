import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import About from './About/About';
import TestimonialsSection from './Testimonial/TestimonialsSection';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;