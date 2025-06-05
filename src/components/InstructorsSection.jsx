import { GraduationCap, Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const instructors = [
  {
    name: "Dr. Emily Carter",
    title: "Data Science Expert",
    image: "https://i.pravatar.cc/150?img=32",
    email: "emily@lms.com",
  },
  {
    name: "Mr. James Lee",
    title: "Full-Stack Developer",
    image: "https://i.pravatar.cc/150?img=56",
    email: "james@lms.com",
  },
  {
    name: "Dr. Amina Khaled",
    title: "Cybersecurity Specialist",
    image: "https://i.pravatar.cc/150?img=47",
    email: "amina@lms.com",
  },
  {
    name: "Prof. Carlos Rivera",
    title: "AI Researcher",
    image: "https://i.pravatar.cc/150?img=12",
    email: "carlos@lms.com",
  },
  {
    name: "Dr. Julia Smith",
    title: "Cloud Architect",
    image: "https://i.pravatar.cc/150?img=39",
    email: "julia@lms.com",
  },
  {
    name: "Eng. Tarek Mahmoud",
    title: "DevOps Engineer",
    image: "https://i.pravatar.cc/150?img=21",
    email: "tarek@lms.com",
  },
];

const InstructorsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Meet Our Instructors
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          modules={[Autoplay]}
        >
          {instructors.map((inst, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {inst.name}
                </h3>
                <p className="text-purple-600 text-sm flex items-center justify-center gap-1 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  {inst.title}
                </p>
                <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  {inst.email}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InstructorsSection;
