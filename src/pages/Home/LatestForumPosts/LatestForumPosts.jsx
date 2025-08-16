import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";

const LatestForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fit-path-server.vercel.app/forums/latest").then((res) => setPosts(res.data));
  }, []);

  // Motion variants for cards (unchanged)
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    hiddenUp: { opacity: 0, y: -50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="py-16 px-4 md:px-10 lg:px-20"   // Featured-এর মতো section spacing
    >
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          <span className="text-[#f34e3a]">Latest</span> Community Posts
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const variant =
              index % 3 === 0
                ? "hiddenLeft"
                : index % 3 === 1
                  ? "hiddenRight"
                  : "hiddenUp";

            return (
              <motion.div
                key={post._id}
                variants={cardVariants}
                initial={cardVariants[variant]}
                whileInView="visible"
                viewport={{ once: false }}
                className="bg-orange-50 rounded-xl shadow-lg hover:shadow-2xl p-6 md:p-7 
                           text-left transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#03466e] mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                  {post.content.slice(0, 100)}...
                </p>

                <Link
                  to="/forum"
                  className="group relative inline-flex h-10 items-center justify-center rounded-full 
             bg-[#f34e3a] px-5 pr-12 font-medium text-white 
             shadow-md transition-all duration-300 ease-out 
             hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50 
             select-none overflow-hidden"
                >
                  <span className="z-10 pr-2">Explore More</span>

                  <div
                    className="absolute right-1 inline-flex h-9 w-9 items-center justify-end rounded-full 
               bg-[#e03a2d] transition-[width] duration-300 ease-out 
               group-hover:w-[calc(100%-8px)]"
                  >
                    <div className="mr-3 flex items-center justify-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LatestForumPosts;
