import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

const AllClassesPage = () => {

  useEffect(() => {
      document.title = "All Classes | FitPath";
    }, []);

  const [classes, setClasses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const limit = 6;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/paginated-classes?page=${page}&search=${search}`)
      .then((res) => {
        setClasses(res.data.classes);
        setTotal(res.data.total);
      });
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

   useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <motion.h2
        className="text-4xl font-semibold text-center text-[#f34e3a] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        All Classes
      </motion.h2>

      <motion.input
        type="text"
        placeholder="Search classes..."
        value={search}
        onChange={handleSearch}
        className="w-full p-4 border rounded-xl shadow-lg mb-8 focus:ring-2 focus:ring-[#f34e3a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <motion.div
            key={cls._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{cls.name}</h3>
            <p className="text-sm text-gray-600">{cls.description}</p>
            <p className="text-sm text-gray-500 mt-4">Bookings: {cls.bookingCount || 0}</p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-gray-800">Trainers:</h4>
              <div className="flex gap-4">
                {cls.trainers?.map((trainer) => (
                  <motion.img
                    key={trainer._id}
                    src={trainer.image}
                    alt={trainer.name}
                    title={trainer.name}
                    className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-300 hover:border-[#f34e3a] transition-all duration-300"
                    onClick={() => navigate(`/trainer/${trainer._id}`)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                ))}
                {!cls.trainers?.length && <p className="text-sm text-gray-500">No trainers listed.</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 pt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-full text-lg ${
              page === i + 1
                ? "bg-[#f34e3a] text-white"
                : "bg-white text-[#f34e3a] border border-[#f34e3a]"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AllClassesPage;
