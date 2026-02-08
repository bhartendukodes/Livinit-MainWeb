"use client";

import { useState, useRef, useEffect } from "react";

const API_URL = "https://api.livinit.ai/api/v1/users";

export default function PartnerBetaForm() {
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setShowExtraFields(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const revealExtra = () => setShowExtraFields(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowExtraFields(true);

    const body = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      mobile_number: mobileNumber.trim() || "",
      email: email.trim(),
      extra_info: {},
    };

    if (!body.first_name || !body.last_name || !body.email) {
      setError("Please fill in first name, last name, and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { detail?: string }).detail ||
            (data as { message?: string }).message ||
            `Request failed (${res.status})`
        );
      }
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setMobileNumber("");
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section
        id="onboarding"
        className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24 scroll-mt-24"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 font-nacelle text-3xl font-bold text-white md:text-4xl">
            You&apos;re on the list
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-300">
            We&apos;ll send your private beta link to your email. Check your inbox soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="onboarding"
      className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500/20 px-4 py-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Retail Reality Sync
          </span>
        </div>

        <h2 className="font-nacelle text-4xl font-bold text-white md:text-5xl">
          LIVINIT{" "}
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            (Try Beta)
          </span>
        </h2>
        <p className="mt-2 font-nacelle text-3xl font-bold text-white md:text-4xl">
          For free
        </p>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
          Spatially intelligent, budget-aware. Enter your email to get a private
          beta link for to-scale layouts that fit your floor plan.
        </p>

        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </p>
          )}

          <div
            className={`max-w-md overflow-hidden transition-all duration-500 ease-out ${
              showExtraFields ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name (required)"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  aria-label="First name (required)"
                />
                <input
                  type="text"
                  placeholder="Last name (required)"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  aria-label="Last name (required)"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                aria-label="Phone number (optional)"
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Enter your email address... (required)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input min-h-12 w-full rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            aria-label="Email address (required)"
            onFocus={revealExtra}
            onClick={revealExtra}
          />

          <button
            type="submit"
            onClick={revealExtra}
            disabled={loading}
            className="btn w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting…" : "Try Beta"}
          </button>
        </form>

        <div ref={bottomSentinelRef} className="h-20 w-full" aria-hidden />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium uppercase tracking-wider text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span className="text-green-400">✓</span>
            No credit card required
          </span>
          <span className="h-4 w-px bg-gray-600" aria-hidden />
          <span>Limited spots available</span>
        </div>
      </div>
    </section>
  );
}
