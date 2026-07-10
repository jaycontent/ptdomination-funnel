import { Check } from "lucide-react";

interface CredibilityChipsProps {
  chips: Array<{
    title: string;
    description: string;
  }>;
}

export function CredibilityChips({ chips }: CredibilityChipsProps) {
  return (
    <section className="w-full bg-black py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Check className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                    {chip.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {chip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
