import {
  Laptop,
  Timer,
  UserCheck,
  BadgeCheck,
  Info,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Certified Courses",
    description: "Earn official certificates upon completing each course.",
    icon: <BadgeCheck className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Expert Instructors",
    description: "Learn from professionals with real-world experience.",
    icon: <UserCheck className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Flexible Schedule",
    description: "Study at your own pace, anytime, anywhere.",
    icon: <Timer className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "100% Online Learning",
    description: "Access courses from any device, fully online.",
    icon: <Laptop className="w-6 h-6 text-purple-600" />,
  },
];

const FeaturesSection = () => {
  return (
    <>
      {/* --- Features Section --- */}
      <section className="py-16 bg-white dark:bg-gray-900 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Why Choose <span className="text-purple-600">Our Platform?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            We provide a unique learning experience with top instructors and modern tools to help you succeed.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-700/20 rounded-full mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section className="py-20 bg-gray-100 dark:bg-gray-950 border-t dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Info className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            About <span className="text-purple-600">Our Platform</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
            Our e-learning platform is designed to provide high-quality education accessible to everyone.
            We connect learners with industry experts and offer certified, flexible, and engaging courses
            in various fields like programming, business, design, and more.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-left">
            <div className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                🎯 Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Empower learners around the world by making education affordable, accessible, and effective for all.
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                🌍 Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                To become the #1 online platform that supports continuous learning and professional growth globally.
              </p>
            </div>
          </div>

          <div className="mt-10 text-sm text-gray-500 dark:text-gray-500">
            <Users className="w-5 h-5 inline-block mr-1" />
            Over 50,000 learners trust our platform 💜
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
