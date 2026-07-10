interface FooterProps {
  privacyPolicyUrl: string;
}

export function Footer({ privacyPolicyUrl }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-gray-800 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} PT Domination. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={privacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
