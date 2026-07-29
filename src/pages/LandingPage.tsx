export default function LandingPage() {
  return (
    <section
      className="relative flex flex-col items-center justify-center flex-1 min-h-[min(70vh,640px)] px-4 overflow-hidden"
      aria-label="Home"
    >
      <video
        src="/videos/reel.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 w-full h-full object-cover"
      />
      <div className="fixed inset-0 z-0 bg-black/40" aria-hidden="true" />
    </section>
  );
}
