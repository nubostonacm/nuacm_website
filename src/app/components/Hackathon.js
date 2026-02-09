const HackathonSection = () => {
  return (
    <section
      id="hackathon"
      className="min-h-screen flex items-center justify-center bg-celestial-blue py-20"
    >
      <div className="bg-gunmetal bg-opacity-50 rounded-xl p-12 max-w-3xl text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold text-gunmetal mb-2">
          NUACM Hackathon — mid-March
        </h2>
        <p className="text-lg text-white leading-relaxed">
          Build something amazing in 24 hours. Meet students across disciplines,
          learn new tech, and compete for prizes. Open to all experience levels.
        </p>
        <a
          href="/hackathon"
          className="bg-tiffany-blue text-gunmetal font-bold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          Register →
        </a>
      </div>
    </section>
  );
};

export default HackathonSection;
