'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  vimeoId: string;
  name: string;
  title: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    vimeoId: '958186577',
    name: 'Testimonial 1',
    title: 'Event Attendee',
    quote: 'Hear what our attendees have to say'
  },
  {
    id: '2',
    vimeoId: '958244994',
    name: 'Testimonial 2',
    title: 'Event Attendee',
    quote: 'Real stories from real people'
  },
  {
    id: '3',
    vimeoId: '958242518',
    name: 'Testimonial 3',
    title: 'Event Attendee',
    quote: 'Transformative experiences shared'
  },
  {
    id: '4',
    vimeoId: '958190243',
    name: 'Testimonial 4',
    title: 'Event Attendee',
    quote: 'Success stories that inspire'
  }
];

export default function TestimonialSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setActiveVideo(null);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600/20 rounded-full mb-4">
            <Quote className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hear From Our Community
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real stories from people who've experienced the transformation firsthand
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 ml-[10%] mr-[10%]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-[80%] md:w-[60%] lg:w-[50%] transition-all duration-500"
                  style={{
                    opacity: selectedIndex === index ? 1 : 0.3,
                    transform: selectedIndex === index ? 'scale(1)' : 'scale(0.85)',
                  }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                    {activeVideo === testimonial.vimeoId ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${testimonial.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={`https://vumbnail.com/${testimonial.vimeoId}.jpg`}
                          alt={testimonial.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <button
                          onClick={() => setActiveVideo(testimonial.vimeoId)}
                          className="absolute inset-0 flex items-center justify-center hover:bg-black/30 transition-all duration-300 group"
                          aria-label={`Play testimonial from ${testimonial.name}`}
                        >
                          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-2xl">
                            <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                          </div>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-sm font-medium opacity-90">{testimonial.quote}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
