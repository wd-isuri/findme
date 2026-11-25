import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Check,
  ImagePlus,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const categories = [
  "Electronics",
  "Clothing",
  "Books & Stationery",
  "Bags & Wallets",
  "ID/Credit cards & Keys",
  "Other",
];

const initialForm = {
  title: "",
  category: "",
  dateLost: "",
  location: "",
  description: "",
  secretDetail: "",
};

export default function ReportLostItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Image Preview
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Form Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setError("");
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("category", form.category);
      formData.append("type", "LOST");
      formData.append("location", form.location.trim());
      formData.append("dateLost", form.dateLost);
      formData.append("description", form.description.trim());

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${API_URL}/api/items`,
        formData
      );

      navigate(`/items/${response.data.data._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] px-5 py-12 md:px-10">
      <div className="mx-auto max-w-3xl">

        {/* Page Header */}
        <div className="mb-9">
          <span className="mb-4 inline-block rounded-full bg-[#E6F1ED] px-4 py-2 text-xs font-semibold tracking-widest text-[#0C4E55]">
            LOST REPORT
          </span>

          <h1 className="mb-3 font-serif text-4xl font-semibold text-[#173F43] md:text-5xl">
            Report a lost item
          </h1>

          <p className="text-[#71817F]">
            Tell us what you lost so we can help you find it.
          </p>
        </div>

        {/* Report Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#E6EBE8] bg-white p-6 shadow-sm md:p-8"
        >
          <div className="space-y-6">

            {/* Item Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#173F43]"
              >
                Item title <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                maxLength={100}
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Black wireless earbuds"
                className="w-full rounded-xl border border-[#E1E9E5] px-4 py-3 text-sm outline-none focus:border-[#0C4E55]"
              />
            </div>

            {/* Category and Date */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#173F43]"
                >
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E1E9E5] bg-white px-4 py-3 text-sm outline-none focus:border-[#0C4E55]"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="dateLost"
                  className="mb-2 block text-sm font-semibold text-[#173F43]"
                >
                  Date lost <span className="text-red-500">*</span>
                </label>

                <input
                  id="dateLost"
                  name="dateLost"
                  type="date"
                  required
                  max={new Date().toLocaleDateString("en-CA")}
                  value={form.dateLost}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E1E9E5] px-4 py-3 text-sm outline-none focus:border-[#0C4E55]"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-[#173F43]"
              >
                Last seen location <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA6A3]"
                />

                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Main Library, Level 2"
                  className="w-full rounded-xl border border-[#E1E9E5] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#0C4E55]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#173F43]"
              >
                Detailed description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe color, material, size, and other visible details..."
                className="w-full resize-none rounded-xl border border-[#E1E9E5] px-4 py-3 text-sm outline-none focus:border-[#0C4E55]"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-[#173F43]"
              >
                Upload item photo{" "}
                <span className="font-normal text-[#71817F]">(optional)</span>
              </label>

              <label
                htmlFor="image"
                className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C9DDD7] bg-[#F6FBF8] p-5 text-center transition-colors hover:bg-[#EAF4F1]"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Selected item preview"
                    className="max-h-44 rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <ImagePlus size={30} className="mb-3 text-[#0C4E55]" />
                    <span className="text-sm font-semibold text-[#0C4E55]">
                      Choose a photo or drag it here
                    </span>
                    <span className="mt-2 text-xs text-[#71817F]">
                      JPG, PNG or WebP — up to 5 MB
                    </span>
                  </>
                )}
              </label>

              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="sr-only"
              />

              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-[#B45345]"
                >
                  <X size={15} />
                  Remove photo
                </button>
              )}
            </div>

            {/* Private Details */}
            <div>
              <label
                htmlFor="secretDetail"
                className="mb-2 block text-sm font-semibold text-[#173F43]"
              >
                Additional identifying details{" "}
                <span className="font-normal text-[#71817F]">(optional)</span>
              </label>

              <textarea
                id="secretDetail"
                name="secretDetail"
                rows={3}
                value={form.secretDetail}
                onChange={handleChange}
                placeholder="Details only you would know..."
                className="w-full resize-none rounded-xl border border-[#E1E9E5] px-4 py-3 text-sm outline-none focus:border-[#0C4E55]"
              />

              <p className="mt-2 text-xs text-[#71817F]">
                Keep unique identifying details private for ownership verification.
              </p>
            </div>

            {/* Submission Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl bg-[#FCE8E5] p-4 text-sm text-[#B45345]"
              >
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-[#E6EBE8] pt-6">
              <Link
                to="/items"
                className="text-sm font-medium text-[#71817F] hover:text-[#0C4E55]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0C4E55] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#083B41] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Report"}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 rounded-xl bg-[#EAF4F1] p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#0C4E55]" />
            <h2 className="font-semibold text-[#173F43]">
              Your privacy matters
            </h2>
          </div>

          <p className="mt-2 text-sm text-[#647875]">
            Private identifying details are used for verification and are not
            shown publicly.
          </p>
        </div>

        {/* Reporting Tips */}
        <div className="mt-5 rounded-xl border border-[#E6EBE8] bg-white p-6">
          <h2 className="mb-4 font-semibold text-[#173F43]">
            A helpful report includes
          </h2>

          <div className="space-y-3">
            {[
              "A clear, specific title",
              "The closest known location",
              "Visible colors and materials",
              "An approximate date and time",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-3 text-sm text-[#647875]">
                <Check size={16} className="text-[#247A55]" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
