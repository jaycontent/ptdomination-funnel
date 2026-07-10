import Image from "next/image";
import { Users } from "lucide-react";

interface SpeakerGridProps {
  speakers: Array<{
    name: string;
    title: string;
    image: string;
    bio: string;
  }>;
}

export function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
              Meet Your Instructors
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Learn From The Best
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Your instructors have helped hundreds of trainers build six-figure online businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {speaker.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-4">
                  {speaker.title}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
