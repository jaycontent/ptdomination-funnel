import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQProps {
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQ({ faq }: FAQProps) {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <span className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Everything you need to know about the challenge
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors"
            >
              <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline text-left">
                <span className="text-lg md:text-xl font-semibold text-white pr-4">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 md:px-8 pb-6">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
