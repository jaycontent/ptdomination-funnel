interface VideoSectionProps {
  videoEmbedUrl: string;
}

export function VideoSection({ videoEmbedUrl }: VideoSectionProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Watch This Brief Video
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how the Content to Cash Challenge can transform your online training business
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-950 border border-gray-800">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={videoEmbedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Content to Cash Challenge Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
