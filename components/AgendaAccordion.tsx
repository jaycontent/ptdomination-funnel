import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "lucide-react";

interface AgendaAccordionProps {
  agenda: Array<{
    day: string;
    title: string;
    sessions: string[];
  }>;
}

export function AgendaAccordion({ agenda }: AgendaAccordionProps) {
  return (
    <section className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-blue-400" />
            <span className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
              What You'll Learn
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            3-Day Challenge Agenda
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Each day builds on the last, giving you a complete roadmap to transform your content strategy
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="space-y-4"
        >
          {agenda.map((day, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors"
            >
              <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline group">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <span className="text-xl md:text-2xl font-bold text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium mb-1">
                      {day.day}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white">
                      {day.title}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 md:px-8 pb-6">
                <div className="pl-16 md:pl-20 space-y-4">
                  {day.sessions.map((session, sessionIndex) => (
                    <div key={sessionIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {session}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
