
import React from "react";
import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Package,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function ItemCard({ item, onViewDetails }) {
  const isLost = item.type === "LOST";

  const imageSrc = item.imageUrl
    ? item.imageUrl.startsWith("http")
      ? item.imageUrl
      : `${API_URL}${item.imageUrl}`
    : null;

  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E6EBE8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

      {/* Item Image */}
        <div className="relative h-52 overflow-hidden bg-[#EAF4F1]">
            {imageSrc ? (
            <img
            src={imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/favicon.svg";
                e.currentTarget.className =
                "h-full w-full object-contain p-16";
            }}
            />
            ) : (
                <div className="flex h-full items-center justify-center text-[#8AA6A3]">
                <Package size={42} strokeWidth={1.3} />
                </div>
            )}

            {/* Status Badge */}
            <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                isLost
                    ? "bg-[#FCE8E5] text-[#B45345]"
                    : "bg-[#DDF4E8] text-[#247A55]"
                }`}
            >
                {isLost ? "LOST" : "FOUND"}
            </span>
            </div>

             {/* Item details */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#7C9994]">
            {item.category}
          </p>

          <h3 className="line-clamp-1 text-lg font-semibold text-[#173F43]">
            {item.title}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-[#71817F]">
          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <span className="line-clamp-1">{item.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-[#647875]">
          {item.description}
        </p>

        <div className="mt-2 border-t border-[#EDF1EF] pt-3">
          <button
            type="button"
            onClick={() => onViewDetails?.(item._id)}
            className="flex w-full items-center justify-between text-sm font-semibold text-[#0C4E55] transition-colors hover:text-[#087A82]"
          >
            View Details
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
