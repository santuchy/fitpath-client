import { FaChartLine, FaUsers, FaClock, FaComments } from "react-icons/fa";

const features = [
  {
    title: "Track Your Progress",
    description: "Visualize your fitness journey with real-time stats and analytics. Set goals and crush them!",
    icon: <FaChartLine className="text-4xl text-blue-600" />,
  },
  {
    title: "Certified Trainers",
    description: "Get expert guidance from experienced and certified trainers tailored to your fitness needs.",
    icon: <FaUsers className="text-4xl text-green-600" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Access classes anytime with our wide range of time slots—designed to fit your routine.",
    icon: <FaClock className="text-4xl text-yellow-600" />,
  },
  {
    title: "Community Support",
    description: "Join a vibrant fitness community where members inspire, motivate, and grow together.",
    icon: <FaComments className="text-4xl text-purple-600" />,
  },
];

const Featured = () => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-gray-50">
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Why Choose <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center text-center transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
