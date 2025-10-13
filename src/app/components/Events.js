const EventSection = () => {
    return (
      <section id="events" className="min-h-screen flex flex-col items-center justify-start py-20 bg-lapis-lazuli text-white">
        <h2 className="text-4xl font-bold mb-8 pt-20 md:pt-30 pb-15 text-tiffany-blue ">Upcoming Events</h2>
        <div className="w-full max-w-4xl px-4">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=nubostonacm%40gmail.com&ctz=America%2FNew_York"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>
    );
  }
  
  export default EventSection;
  