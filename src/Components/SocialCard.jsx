import { cn } from "../lib/utils";

const SocialCard = ({ socialHandle }) => {
  const { name, href, className, Icon, cardData } = socialHandle;

  return (
    <div className="relative">
      {/* ICON (ONLY THIS TRIGGERS HOVER) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "peer inline-flex items-center justify-center rounded-full p-3 text-2xl text-white transition-transform hover:scale-110",
          className
        )}
      >
        {Icon}
      </a>

      {/* TOOLTIP CARD */}
      <div
        className="
          pointer-events-none
          absolute bottom-full left-1/2 z-50 mb-3 w-[280px]
          -translate-x-1/2
          scale-95 opacity-0
          transition-all duration-300 ease-out
          peer-hover:scale-100 peer-hover:opacity-100
        "
      >
        <div className="flex flex-col rounded-xl bg-neutral-900 text-white shadow-xl">
          {/* HEADER / BANNER */}
          <div className="relative h-24 w-full overflow-hidden rounded-t-xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cardData.banner})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* AVATAR */}
          <div className="absolute left-5 top-14">
            <img
              src={cardData.avatar}
              alt={name}
              className="h-16 w-16 rounded-full border-4 border-neutral-900 bg-neutral-800 object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col px-5 pb-5 pt-10">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{name}</span>

              {/* VERIFIED BADGE */}
              <svg
                viewBox="0 0 24 24"
                aria-label="Verified account"
                className="h-5 w-5 fill-blue-500"
              >
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.435.716 2.69 1.77 3.396-.322.567-.52 1.226-.52 1.937 0 2.21 1.71 4.002 3.818 4.002.47 0 .92-.084 1.336-.25.62 1.334 1.926 2.25 3.437 2.25s2.816-.917 3.437-2.25c.415.165.866.25 1.336.25 2.11 0 3.818-1.79 3.818-4 0-.71-.198-1.37-.52-1.937 1.052-.707 1.77-1.96 1.77-3.396z" />
              </svg>
            </div>

            <span className="mb-3 text-sm text-neutral-400">
              {cardData.handle}
            </span>

            <p className="text-sm leading-tight text-neutral-200">
              {cardData.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
