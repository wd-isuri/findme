
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Package,
  ShieldCheck,
  Tag,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Fetch Item Details
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      setLoading(true);
      setError("");
      setImageError(false);

      try {
        const [itemResponse, itemsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/items/${id}`, {
            signal: controller.signal,
          }),
          axios.get(`${API_URL}/api/items`, {
            signal: controller.signal,
          }),
        ]);

        const selectedItem = itemResponse.data.data;
        setItem(selectedItem);

        const related = (itemsResponse.data.data || [])
          .filter(
            (candidate) =>
              candidate._id !== selectedItem._id &&
              candidate.category === selectedItem.category
          )
          .slice(0, 3);

        setRelatedItems(related);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load item details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => controller.abort();
  }, [id]);

  const imageUrl = item?.imageUrl
    ? item.imageUrl.startsWith("http")
      ? item.imageUrl
      : `${API_URL}${item.imageUrl}`
    : null;

  const formattedDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  // Loading and Error States
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] py-24 text-center text-[#647875]">
        Loading item details...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] px-5 py-24 text-center">
        <h1 className="mb-4 text-2xl font-semibold text-[#173F43]">
          Item unavailable
        </h1>
        <p className="mb-6 text-[#647875]">
          {error || "This item could not be found."}
        </p>
        <Link to="/items" className="font-semibold text-[#0C4E55]">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* Back Navigation */}
        <Link
          to="/items"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0C4E55] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Browse
        </Link>

        {/* Item Image */}
        <div className="mb-8 flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-[#EAF4F1] md:h-[420px]">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={item.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package size={70} strokeWidth={1.2} className="text-[#8AA6A3]" />
          )}
        </div>

        {/* Item Header */}
        <div className="mb-6">
          <span
            className={`mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
              item.type === "LOST"
                ? "bg-[#FCE8E5] text-[#B45345]"
                : "bg-[#DDF4E8] text-[#247A55]"
            }`}
          >
            {item.type}
          </span>

          <h1 className="font-serif text-4xl font-semibold text-[#173F43] md:text-5xl">
            {item.title}
          </h1>
        </div>

        {/* Item Information */}
        <div className="mb-8 grid gap-5 border-y border-[#E1E9E5] py-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Tag size={20} className="text-[#72918D]" />
            <div>
              <p className="text-xs text-[#71817F]">Category</p>
              <p className="font-medium text-[#173F43]">{item.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-[#72918D]" />
            <div>
              <p className="text-xs text-[#71817F]">Location</p>
              <p className="font-medium text-[#173F43]">{item.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-[#72918D]" />
            <div>
              <p className="text-xs text-[#71817F]">Reported</p>
              <p className="font-medium text-[#173F43]">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#72918D]" />
            <div>
              <p className="text-xs text-[#71817F]">Status</p>
              <p className="font-medium text-[#173F43]">
                {item.status?.replaceAll("_", " ") || "OPEN"}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-[#173F43]">
            Description
          </h2>
          <p className="leading-7 text-[#647875]">{item.description}</p>
        </section>

        {/* Privacy Notice */}
        <div className="mb-7 flex gap-3 rounded-xl bg-[#EAF4F1] p-5 text-sm text-[#426B67]">
          <ShieldCheck size={20} className="shrink-0" />
          <p>
            Personal contact information and private verification answers are
            never shown publicly.
          </p>
        </div>

        {/* Item Actions */}
        <div className="mb-16 flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            title="Claim functionality will be added next"
            className="cursor-not-allowed rounded-xl bg-[#0C4E55] px-6 py-3 text-sm font-semibold text-white opacity-60"
          >
            {item.type === "FOUND"
              ? "This Might Be Mine"
              : "I Found This Item"}
          </button>

          {item.type === "FOUND" && (
            <button
              type="button"
              disabled
              title="Verification functionality will be added next"
              className="cursor-not-allowed rounded-xl border border-[#0C4E55] px-6 py-3 text-sm font-semibold text-[#0C4E55] opacity-60"
            >
              Start Verification
            </button>
          )}
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="border-t border-[#E1E9E5] pt-10">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-[#173F43]">
              Related Items
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((related) => (
                <Link
                  key={related._id}
                  to={`/items/${related._id}`}
                  className="rounded-xl border border-[#E1E9E5] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <span className="mb-2 inline-block text-xs font-semibold text-[#0C4E55]">
                    {related.type}
                  </span>
                  <h3 className="mb-2 font-semibold text-[#173F43]">
                    {related.title}
                  </h3>
                  <p className="mb-4 text-sm text-[#71817F]">
                    {related.location}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C4E55]">
                    View Details <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
