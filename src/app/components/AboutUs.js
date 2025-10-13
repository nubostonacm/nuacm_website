const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-celestial-blue pt-20 md:pt-25 pb-24"
    >
      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-25 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* About ACM Section */}
        <div className="flex flex-col justify-between text-left bg-gunmetal bg-opacity-50 p-8 rounded-lg min-h-[400px]">
          <h2 className="text-4xl font-bold text-gunmetal mb-4">About ACM</h2>
          <p className="text-lg text-white leading-relaxed text-justify">
            ACM @ Northeastern is a student-run chapter that fosters a community of computing
            enthusiasts. We organize workshops, hackathons, and networking events to help students
            develop skills, collaborate on projects, and connect with industry professionals. Our chapter provides a platform for students to explore cutting-edge 
            technologies to enhance their technical expertise.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col justify-between text-left md:text-right bg-gunmetal bg-opacity-50 p-8 rounded-lg min-h-[400px]">
          <h3 className="text-4xl font-bold text-gunmetal mb-4">Our Mission</h3>
          <p className="text-lg text-white leading-relaxed text-justify">
            At ACM @ Northeastern, we are committed to empowering students to grow their technical
            and leadership skills, engage with the tech community, and develop a passion for
            computing. Through hands-on workshops, hackathons, and mentorship, we strive to create an 
            inclusive environment where members can collaborate and innovate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
