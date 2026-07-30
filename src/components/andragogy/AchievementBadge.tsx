import type {
  Achievement,
  AchievementMotif,
} from "@/content/andragogy/achievements";

const PHASE_COLORS: Record<number, string> = {
  1: "#3dd6c6",
  2: "#7C5CFF",
  3: "#58A6FF",
  4: "#D4A017",
};

function motifPath(motif: AchievementMotif) {
  switch (motif) {
    case "spark":
      return "M50 28v8M50 64v8M28 50h8M64 50h8M34 34l6 6M66 66l-6-6M34 66l6-6M66 34l-6 6M50 42a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z";
    case "map":
      return "M32 36h36v28H32zM40 44h8v8h-8zM52 52h8v8h-8zM40 36v36";
    case "teach":
      return "M30 42l20-10 20 10-20 10-20-10Zm0 0v16c8 6 32 6 40 0V42";
    case "gate":
      return "M30 70V38l20-10 20 10v32M42 70V52h16v18";
    case "student":
      return "M50 34a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM34 70c2-10 10-16 16-16s14 6 16 16";
    case "research":
      return "M42 34h16v10H42zM38 48h24v22H38zM46 56h8";
    case "portfolio":
      return "M34 40h32v28H34zM42 34h16v6H42zM42 50h16M42 58h10";
    case "expert":
      return "M50 28l5 12h13l-10 8 4 13-12-8-12 8 4-13-10-8h13z";
    case "writing":
      return "M36 32h28v36H36zM42 42h16M42 50h16M42 58h10";
    case "product":
      return "M34 42h32v28H34zM42 34h16v8H42z";
    default:
      return "M50 36a14 14 0 1 1 0 28 14 14 0 0 1 0-28Z";
  }
}

export function AchievementBadge({
  achievement,
  earned = false,
  size = 96,
  showTitle = false,
}: {
  achievement: Achievement;
  earned?: boolean;
  size?: number;
  showTitle?: boolean;
}) {
  const ring =
    achievement.category === "expert"
      ? "url(#andrExpertGrad)"
      : (PHASE_COLORS[achievement.phase] ?? "#3dd6c6");
  const grayscale = earned ? undefined : { filter: "grayscale(1)", opacity: 0.45 };

  return (
    <div className="inline-flex flex-col items-center gap-2" style={grayscale}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${achievement.title}${earned ? " earned" : " locked"}`}
      >
        <defs>
          <linearGradient id="andrExpertGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3dd6c6" />
            <stop offset="50%" stopColor="#7C5CFF" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>
          <radialGradient id="andrBadgeGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#andrBadgeGlow)"
          stroke={ring}
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="#0f1b2e"
          stroke={ring}
          strokeWidth="2"
          opacity="0.95"
        />
        <path
          d={motifPath(achievement.motif)}
          fill="none"
          stroke={achievement.category === "expert" ? "#D4A017" : ring}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!earned ? (
          <g>
            <circle cx="72" cy="72" r="12" fill="#1a2740" />
            <path
              d="M68 72v-3a4 4 0 0 1 8 0v3M66 72h12v8H66z"
              fill="#9db0c9"
            />
          </g>
        ) : null}
      </svg>
      {showTitle ? (
        <p
          className={`max-w-[8rem] text-center text-xs font-semibold ${earned ? "text-foreground" : "text-muted"}`}
        >
          {achievement.title}
        </p>
      ) : null}
    </div>
  );
}
