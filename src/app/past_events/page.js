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
      className="min-h-screen bg-gradient-to-b from-[#1E2833] to-[#2374A7]"
    >
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-white text-4xl font-bold text-center mb-12 tracking-wide">
          Past Events
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#4098C2]/60 scrollbar-track-[#1E2833]/30 pb-4">
          {past_events.map(({ title, img, desc }) => (
            <article
              key={title}
              className="flex-none w-96 rounded-2xl overflow-hidden bg-[#1E2833] border border-[#4098C2]/30 shadow-xl transition-transform hover:-translate-y-0.5 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#5FBBC4] mb-2 relative">
                  {title}
                  <div className="w-16 h-[3px] bg-[#4098C2] mt-2 rounded-full bg-opacity-80"></div>
                </h3>
                <p className="text-gray-200 leading-relaxed">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
