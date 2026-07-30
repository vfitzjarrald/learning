export function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="bg-drift pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(61,214,198,0.22), transparent 42%), radial-gradient(circle at 82% 12%, rgba(88,126,255,0.18), transparent 36%), linear-gradient(160deg, #07101c 0%, #0b1220 48%, #101b2e 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(157,176,201,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(157,176,201,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 78%)",
        }}
      />
    </>
  );
}
