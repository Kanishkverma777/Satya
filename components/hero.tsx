import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="w-full max-w-5xl mx-auto rounded-2xl border border-[#23283a] bg-[#181c25] shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Text & CTA */}
        <div className="flex-1 px-8 py-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Get ready for the<br />
            new era of AI
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et vulputate tortor, in posuere nibh. Praesent sit amet metus porttitor mi consectetur pellentesque in at leo.
          </p>
          <Link href="/detect">
            <button className="rounded-md px-8 py-3 font-semibold bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-lg hover:from-[#6366f1] hover:to-[#7c3aed] transition text-lg">
              Start Detection
            </button>
          </Link>
        </div>
        {/* Right: 3D Object (Spline) */}
        <div className="flex-1 flex items-center justify-center min-h-[320px] bg-transparent">
          <div className="w-64 h-64 rounded-full overflow-hidden flex items-center justify-center shadow-2xl border border-[#23283a] bg-[#181c25]">
            <iframe
              src="https://my.spline.design/radialglass-H40YeTYxsHCGqLpBnPLtxyCD/"
              frameBorder="0"
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              title="3D Spline Scene"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
