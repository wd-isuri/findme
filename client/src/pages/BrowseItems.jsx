
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import ItemCard from "../components/ItemCard.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const categories = [
  "Electronics",
  "Clothing",
  "Books & Stationery",
  "Bags & Wallets",
  "ID/Credit cards & Keys",
  "Other",
];

export default function BrowseItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Items
  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_URL}/api/items`, {
          params: {
            ...(search.trim() && { search: search.trim() }),
            ...(type !== "ALL" && { type }),
            ...(category && { category }),
          },
          signal: controller.signal,
        });

        setItems(response.data.data || []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load items. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(fetchItems, search ? 300 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, type, category]);

  // Filter and Sort Items
  const locations = [...new Set(items.map((item) => item.location))]
    .filter(Boolean)
    .sort();

  const filteredItems = items
    .filter((item) => !location || item.location === location)
    .sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setType("ALL");
    setCategory("");
    setLocation("");
    setSort("newest");
    setVisibleCount(9);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#E6F1ED] px-4 py-2 text-xs font-semibold tracking-widest text-[#0C4E55]">
            CAMPUS LOST & FOUND
          </span>

          <h1 className="mb-4 font-serif text-4xl font-semibold text-[#173F43] md:text-5xl">
            Find what you're looking for
          </h1>

          <p className="mx-auto max-w-2xl text-[#71817F]">
            Explore lost and found belongings across your campus.
            Your missing item might already be here.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 rounded-2xl border border-[#E6EBE8] bg-white p-5 shadow-sm md:p-7">
          <div className="relative mb-5">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA6A3]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(9);
              }}
              placeholder="Search for phones, keys, bags..."
              className="w-full rounded-xl border border-[#E1E9E5] bg-[#FBFDFB] py-3 pl-12 pr-4 text-sm outline-none focus:border-[#0C4E55]"
            />
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {["ALL", "LOST", "FOUND"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setType(option);
                  setVisibleCount(9);
                }}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  type === option
                    ? "bg-[#0C4E55] text-white"
                    : "bg-[#F0F5F2] text-[#54716E] hover:bg-[#E3EEEA]"
                }`}
              >
                {option === "ALL" ? "All Items" : `${option[0]}${option.slice(1).toLowerCase()} Items`}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setVisibleCount(9);
              }}
              aria-label="Filter by category"
              className="rounded-xl border border-[#E1E9E5] bg-white px-4 py-3 text-sm text-[#54716E] outline-none focus:border-[#0C4E55]"
            >
              <option value="">All Categories</option>
              {categories.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setVisibleCount(9);
              }}
              aria-label="Filter by location"
              className="rounded-xl border border-[#E1E9E5] bg-white px-4 py-3 text-sm text-[#54716E] outline-none focus:border-[#0C4E55]"
            >
              <option value="">All Locations</option>
              {locations.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort items"
              className="rounded-xl border border-[#E1E9E5] bg-white px-4 py-3 text-sm text-[#54716E] outline-none focus:border-[#0C4E55]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-[#71817F]">
              <SlidersHorizontal size={16} />
              <span>Filter campus items</span>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-2 text-sm font-medium text-[#0C4E55] hover:underline"
            >
              <RotateCcw size={15} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Item Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#173F43]">
            Recent Items
          </h2>

          <span className="text-sm text-[#71817F]">
            {loading ? "Loading..." : `${filteredItems.length} items found`}
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#71817F]">
            Loading campus items...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center text-[#B45345]">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center">
            <h3 className="mb-2 text-xl font-semibold text-[#173F43]">
              No matching items found
            </h3>
            <p className="text-[#71817F]">
              Try another search or adjust your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedItems.map((item) => (
                <ItemCard
                    key={item._id}
                    item={item}
                    onViewDetails={(id) => navigate(`/items/${id}`)}
                    />
              ))}
            </div>

            {visibleCount < filteredItems.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 9)}
                  className="rounded-xl border border-[#0C4E55] px-8 py-3 text-sm font-semibold text-[#0C4E55] hover:bg-[#EAF4F1]"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {/* Report Item CTA */}
        <div className="mt-16 rounded-3xl bg-[#0C4E55] px-6 py-12 text-center text-white md:px-12">
          <h2 className="mb-3 font-serif text-3xl font-semibold">
            Can't find your item?
          </h2>

          <p className="mb-7 text-sm text-[#D4E7E4]">
            Report your missing belonging and let FindMe help you recover it.
          </p>

          <a
            href="/report"
            className="inline-block rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#0C4E55] transition-colors hover:bg-[#EAF4F1]"
          >
            Report an Item
          </a>
        </div>
      </div>
    </div>
  );
}
