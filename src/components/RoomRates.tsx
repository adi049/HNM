import { MEAL_PLANS, RATE_DISCLAIMER, formatINR, type Room } from "../data/hotel";
import { cn } from "../utils/cn";

/** Published tariffs for one room. Not live availability. */
export function RoomRates({
  room,
  tone = "light",
  showDisclaimer = false,
  compact = false,
}: {
  room: Room;
  tone?: "light" | "dark";
  showDisclaimer?: boolean;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div>
      <p
        className={cn(
          "text-[0.62rem] font-medium uppercase tracking-[0.28em]",
          dark ? "text-gold" : "text-gold-dark"
        )}
      >
        Published tariffs · per night
      </p>
      <dl className={cn("mt-3 grid grid-cols-3 gap-2", compact && "gap-1.5")}>
        {MEAL_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "border px-2.5 py-2.5",
              dark ? "border-ivory/15" : "border-charcoal/12 bg-white/60"
            )}
          >
            <dt
              className={cn(
                "text-[0.62rem] font-medium uppercase tracking-[0.2em]",
                dark ? "text-gold" : "text-gold-dark"
              )}
            >
              {plan.id}
            </dt>
            <dd
              className={cn(
                "mt-1 font-serif text-lg leading-none md:text-xl",
                dark ? "text-ivory" : "text-charcoal"
              )}
            >
              {formatINR(room.rates[plan.id])}
            </dd>
            <dd
              className={cn(
                "mt-1.5 text-[0.65rem] font-light leading-snug",
                dark ? "text-ivory/60" : "text-stone-warm"
              )}
            >
              {plan.label}
            </dd>
          </div>
        ))}
      </dl>
      {showDisclaimer && (
        <p
          className={cn(
            "mt-3 text-xs font-light leading-relaxed",
            dark ? "text-ivory/55" : "text-stone-warm"
          )}
        >
          {RATE_DISCLAIMER}
        </p>
      )}
    </div>
  );
}
