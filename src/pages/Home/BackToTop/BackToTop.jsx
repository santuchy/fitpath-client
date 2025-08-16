import React from 'react';
import { useEffect, useState } from "react";
import { FaChevronUp } from 'react-icons/fa';

const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 rounded-full bg-[#f34e3a] hover:bg-[#ce1a06] text-black shadow-lg transition duration-300"
                >
                    <FaChevronUp className="text-xl" />
                </button>
            )}
        </div>
    );
};

export default BackToTop;
