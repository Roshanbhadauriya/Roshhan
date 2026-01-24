import { socialHandles } from "../data/index.js";
import { cn } from "../lib/utils";

const SocialCard = ({ socialHandle, index, total }) => {
  const { name, href, className, Icon, cardData } = socialHandle;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="relative flex items-center justify-center">
      {/* Icon - Trigger */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "peer z-10 rounded-full p-3 text-2xl text-white transition-transform hover:scale-110",
          className
        )}
      >
        {Icon}
      </a>

      {/* Tooltip Card */}
      <div
        className={cn(
          "absolute bottom-full mb-1 hidden flex-col bg-white text-neutral-900 opacity-0 shadow-xl transition-all duration-300",
          "peer-hover:flex peer-hover:opacity-100 hover:flex hover:opacity-100",
          "pointer-events-none peer-hover:pointer-events-auto hover:pointer-events-auto",
          "z-20 border border-neutral-200",
          // Positioning logic
          isFirst
            ? "left-0"
            : isLast
            ? "right-0"
            : "left-1/2 -translate-x-1/2",
          cardData.layout === "compact"
            ? "w-max flex-row items-center gap-3 rounded-full p-2 pr-6"
            : "w-[280px] rounded-xl"
        )}
      >
        {cardData.layout === "compact" ? (
          <>
            {/* Compact Layout */}
            <div className="relative">
              <img
                src={cardData.avatar}
                alt={name}
                className="h-12 w-12 rounded-full border-2 border-neutral-200 object-contain bg-white"
              />
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 border border-neutral-200">
                <div className="text-[12px] text-neutral-900">{Icon}</div>
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-bold text-base leading-tight text-neutral-900">
                {name}
              </span>
              <span className="text-xs font-medium text-neutral-500">
                {cardData.handle}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            {cardData.banner ? (
              <img
                src={cardData.banner}
                alt="Banner"
                className="h-24 w-full rounded-t-xl object-contain opacity-80"
              />
            ) : (
              <div className="h-24 w-full rounded-t-xl bg-gradient-to-r from-neutral-200 to-neutral-100 opacity-80" />
            )}

            {/* Avatar */}
            <div className="absolute left-5 top-14">
              <img
                src={cardData.avatar}
                alt={name}
                className="h-16 w-16 rounded-full border-4 border-white object-contain bg-white"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col px-5 pb-5 pt-10">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold">{cardData.username}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-label="Verified account"
                  className="h-5 w-5 fill-blue-500"
                >
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.435.716 2.69 1.77 3.396-.322.567-.52 1.226-.52 1.937 0 2.21 1.71 4.002 3.818 4.002.47 0 .92-.084 1.336-.25.62 1.334 1.926 2.25 3.437 2.25s2.816-.917 3.437-2.25c.415.165.866.25 1.336.25 2.11 0 3.818-1.79 3.818-4 0-.71-.198-1.37-.52-1.937 1.052-.707 1.77-1.96 1.77-3.396zM17.88 11.32l-6.704 7.027c-.206.216-.494.305-.778.238-.284-.067-.522-.27-.643-.54l-2.67-5.918c-.144-.318-.027-.696.26-.88.29-.184.665-.133.896.11l2.062 4.57 5.726-6.002c.252-.264.67-.278.937-.03.268.248.278.67.014.925z" />
                </svg>
              </div>

              <span className="mb-2 text-sm text-neutral-500">
                {cardData.handle}
              </span>

              <p className="mb-1 text-xs leading-tight text-neutral-700">
                {cardData.bio}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function SocialHandles() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      {socialHandles.map((socialHandle, index) => (
        <SocialCard
          key={index}
          socialHandle={socialHandle}
          index={index}
          total={socialHandles.length}
        />
      ))}
    </div>
  );
}
