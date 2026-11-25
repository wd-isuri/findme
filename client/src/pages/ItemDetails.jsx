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
  Sparkles,
  LoaderCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function ItemDetails() {
  const { id } = useParams();

  return <ItemDetailsContent key={id} id={id} />;
}

function ItemDetailsContent({ id }) {
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [aiMatches, setAiMatches] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSearched, setAiSearched] = useState(false);

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

  // Fetch AI Matches
const handleFindMatches = async () => {
  if (aiLoading) return;

  setAiLoading(true);
  setAiError("");
  setAiMatches([]);
  setAiSearched(false);

  try {
    const response = await axios.get(
      `${API_URL}/api/items/${id}/matches`
    );

    const matches = response.data.data || [];

    const detailedMatches = await Promise.all(
      matches.map(async (match) => {
        const itemResponse = await axios.get(
          `${API_URL}/api/items/${match.itemId}`
        );

        return {
          ...match,
          item: itemResponse.data.data,
        };
      })
    );

    setAiMatches(detailedMatches);
    setAiSearched(true);
  } catch (err) {
    setAiError(
      err.response?.data?.message ||
        "Unable to find AI matches. Please try again."
    );
  } finally {
    setAiLoading(false);
  }
};

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

        {/* AI Matching Section */}
<section className="mb-12 rounded-2xl border border-[#D5E5DF] bg-white p-6 md:p-8">
  <div className="mb-5 flex items-center gap-3">
    <div className="rounded-xl bg-[#EAF4F1] p-3">
      <Sparkles size={25} className="text-[#0C4E55]" />
    </div>

    <div>
      <h2 className="font-serif text-2xl font-semibold text-[#173F43]">
        AI-Powered Matches
      </h2>
      <p className="mt-1 text-sm text-[#71817F]">
        Discover potential matches using artificial intelligence.
      </p>
    </div>
  </div>

  <p className="mb-5 text-sm leading-6 text-[#647875]">
    Our AI compares item descriptions, categories, locations,
    brands and other details to identify potentially matching items.
  </p>

  <button
    type="button"
    onClick={handleFindMatches}
    disabled={aiLoading}
    className="inline-flex items-center gap-2 rounded-xl bg-[#0C4E55] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173F43] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {aiLoading ? (
      <>
        <LoaderCircle size={18} className="animate-spin" />
        Analyzing Items...
      </>
    ) : (
      <>
        <Sparkles size={18} />
        {aiSearched ? "Search Again" : "Find AI Matches"}
      </>
    )}
  </button>

  {/* AI Error State */}
  {aiError && (
    <div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
      {aiError}
    </div>
  )}

  {/* No Matching Results */}
  {aiSearched && aiMatches.length === 0 && (
    <div className="mt-6 rounded-xl bg-[#FBF9F5] p-6 text-center">
      <Package
        size={36}
        className="mx-auto mb-3 text-[#8AA6A3]"
      />
      <h3 className="font-semibold text-[#173F43]">
        No potential matches found
      </h3>
      <p className="mt-2 text-sm text-[#71817F]">
        Check again later when more items have been reported.
      </p>
    </div>
  )}

  {/* AI Matching Results */}
  {aiMatches.length > 0 && (
    <div className="mt-7 space-y-4">
      <h3 className="font-semibold text-[#173F43]">
        {aiMatches.length} Potential{" "}
        {aiMatches.length === 1 ? "Match" : "Matches"} Found
      </h3>

      {aiMatches.map((match) => (
        <div
          key={match.itemId}
          className="rounded-xl border border-[#E1E9E5] bg-[#FBF9F5] p-5"
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#0C4E55]">
                {match.item.type}
              </span>

              <h3 className="mt-1 text-lg font-semibold text-[#173F43]">
                {match.item.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-[#71817F]">
                <MapPin size={15} />
                {match.item.location}
              </p>
            </div>

            <span className="rounded-full bg-[#DDF4E8] px-4 py-2 text-sm font-semibold text-[#247A55]">
              {match.similarityScore}/100 Similarity
            </span>
          </div>

          {/* Similarity Progress Bar */}
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#E1E9E5]">
            <div
              className="h-full rounded-full bg-[#247A55] transition-all duration-500"
              style={{ width: `${match.similarityScore}%` }}
            />
          </div>

          {/* AI Explanation */}
          <div className="mb-5 rounded-lg bg-[#EAF4F1] p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#173F43]">
              <Sparkles size={16} />
              Why this item matches
            </p>

            <p className="text-sm leading-6 text-[#426B67]">
              {match.reason}
            </p>
          </div>

          <Link
            to={`/items/${match.itemId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C4E55] hover:underline"
          >
            View Matching Item
            <ArrowUpRight size={16} />
          </Link>
        </div>
      ))}

      <p className="text-xs leading-5 text-[#71817F]">
        AI-generated matches are suggestions only and do not
        confirm item ownership.
      </p>
    </div>
  )}
</section>

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
