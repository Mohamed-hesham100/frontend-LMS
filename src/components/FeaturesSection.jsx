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
      <section className="py-16 bg-white dark:bg-gray-900 mb-10">
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
    </>
  );
};

export default FeaturesSection;
