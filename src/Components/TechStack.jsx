
import { techstack } from "../data/index.js";

export default function TechStack() {
  return (
    <div className="mt-6 flex items-center gap-6">
      <div className="flex flex-wrap items-center gap-3">
        {techstack.map((item) => (
          <div
            key={item.name}
            className="
              group relative
              flex h-14 w-14 max-[600px]:h-10   max-[600px]:w-10 items-center justify-center
              rounded-full
              bg-background
              border border-border
              shadow-sm
              transition-all
              hover:-translate-y-0.5 hover:shadow-md
            "
          >
            {/* Icon */}
            <span className={`text-xl max-[600px]:text-sm ${item.className}`}>
              {item.icon}
            </span>

            {/* Tooltip */}
            <span
              className="
                pointer-events-none
                absolute -top-9
                scale-0
                rounded-md
                bg-foreground
                px-2 py-1
                text-xs
                text-background
                transition-all
                group-hover:scale-100
              "
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
