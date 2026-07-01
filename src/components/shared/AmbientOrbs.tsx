/** Three slow-drifting blurred gradient orbs — atmospheric depth behind hero-scale scenes. */
export default function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="ambient-orb -left-[10%] -top-[10%] h-[500px] w-[500px] bg-gold"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="ambient-orb -bottom-[5%] -right-[5%] h-[350px] w-[350px] bg-gold/70"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="ambient-orb right-[20%] top-[40%] h-[250px] w-[250px] bg-gold"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}
