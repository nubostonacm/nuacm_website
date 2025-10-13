"use client";
import React from "react";

export default function PastEvents() {
  const past_events = [
    {
      title: "Algorithmic Poker Event",
      img: "/poker-event.png",
      desc:
        "We hosted an interactive hackathon where participants built poker-playing bots and competed head-to-head for prizes. The event blended coding, strategy, and fun — organized with @sandboxnu, @neudisrupt, @c4cneu, @ainortheastern, and sponsored by @nu.kaleidoscope.",
    },
    {
      title: "Co-op Panel",
      img: "/coop_panel.png",
      desc:
        "We hosted an engaging Co-op Panel featuring students who had completed internships and co-ops at top companies including Johnson & Johnson, PwC, DraftKings, Quickbase, Klaviyo, and Bain Capital. Attendees gained firsthand insights into landing co-ops, preparing for interviews, and navigating career growth.",
    },
    {
      title: "Fireside Chat with Steve Schmidt",
      img: "/fireside_chat.png",
      desc:
        "We hosted an exclusive fireside chat with Steve Schmidt, Director of Machine Learning at Nike and Adjunct Professor at Northeastern University. The discussion explored the intersection of AI in industry and academia, offering valuable insights into leadership, innovation, and the evolving role of machine learning in real-world applications.",
    },
    {
      title: "Fall Hackathon",
      img: "/fall_hackathon.png",
      desc:
        "We hosted our annual Fall Hackathon, a weekend-long event where students teamed up to build innovative projects, sharpen their coding skills, and compete for prizes. The hackathon featured meals, networking opportunities, and tracks for 1st, 2nd, and special category winners. Participants collaborated, learned, and showcased their creativity in an inspiring, fast-paced environment.",
    },
  ];

  return (
    <section
      id="past_events"
      className="min-h-screen bg-[#2374A7] pt-20 md:pt-25 pb-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-white text-4xl p-10 sm:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wide">
          Past Events
        </h2>

        
        <div className="
          -mx-4 px-4
          flex gap-4 sm:gap-6
          overflow-x-auto
          snap-x snap-mandatory
          scrollbar-thin scrollbar-thumb-[#4098C2]/60 scrollbar-track-[#1E2833]/30
          pb-2
        ">
          {past_events.map(({ title, img, desc }) => (
            <article
              key={title}
              className="
                snap-center
                flex-none
                w-[88vw] sm:w-[420px] md:w-96
                rounded-2xl overflow-hidden
                bg-[#1E2833]/85 backdrop-blur-sm
                border border-[#4098C2]/30
                shadow-xl transition-transform hover:-translate-y-0.5 hover:shadow-2xl
              "
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#5FBBC4] mb-2">
                  {title}
                </h3>
                <div className="w-16 h-[3px] bg-[#4CAFCE]/90 rounded-full mb-3"></div>
                <p className="text-gray-200/90 text-sm sm:text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
