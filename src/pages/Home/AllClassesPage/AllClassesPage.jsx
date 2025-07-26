import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const AllClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold">All Classes</h2>

      <input
        type="text"
        placeholder="Search classes..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 border rounded"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="border rounded-lg p-4 shadow-md bg-white space-y-2">
            <h3 className="text-xl font-semibold">{cls.name}</h3>
            <p>{cls.description}</p>
            <p className="text-sm text-gray-600">Bookings: {cls.bookingCount || 0}</p>

            <div>
              <h4 className="font-semibold mt-3">Trainers:</h4>
              <div className="flex gap-3 mt-2">
                {cls.trainers?.map((trainer) => (
                  <img
                    key={trainer._id}
                    src={trainer.image}
                    alt={trainer.name}
                    title={trainer.name}
                    className="w-10 h-10 rounded-full cursor-pointer border"
                    onClick={() => navigate(`/trainer/${trainer._id}`)}
                  />
                ))}
                {!cls.trainers?.length && <p className="text-sm text-gray-500">No trainers listed.</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 pt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded border ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClassesPage;
