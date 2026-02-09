"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, Wallet, Sparkles, Loader2, Copy } from "lucide-react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState(1000);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function planTrip() {
    if (!destination || !interests) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/holiday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, interests, budget }),
      });

      const data = await res.json();
      setResult(data.itinerary);
    } catch {
      setResult("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center p-6">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl bg-zinc-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8"
      >
        <Header />

        <div className="grid gap-5 mt-8">
          <Input
            icon={<MapPin size={16} />}
            label="Destination"
            value={destination}
            onChange={setDestination}
          />

          <Input
            icon={<CalendarDays size={16} />}
            label="Days"
            type="number"
            value={days}
            onChange={setDays}
          />

          <Textarea
            label="Interests"
            value={interests}
            onChange={setInterests}
          />

          <BudgetSlider value={budget} onChange={setBudget} />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={planTrip}
          disabled={loading}
          className="mt-8 w-full py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Planning your trip…
            </>
          ) : (
            <>
              <Sparkles size={18} /> Plan My Trip
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {loading && <LoadingCard />}
        </AnimatePresence>

        <AnimatePresence>
          {result && !loading && (
            <ResultCard result={result} onCopy={copyResult} />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

/* ---------------- Background ---------------- */

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
      />
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header() {
  return (
    <div>
      <h1 className="text-4xl font-bold flex items-center gap-2">
        🧳 Holiday Planner AI
      </h1>
      <p className="text-zinc-400 mt-2">
        Personalized trips planned by AI ✨
      </p>
    </div>
  );
}

/* ---------------- Inputs ---------------- */

function Input({ label, value, onChange, type = "text", icon }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm text-zinc-400">{label}</label>
      <div className="flex items-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 focus-within:ring-2 focus-within:ring-white/30">
        {icon && <div className="text-zinc-400">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(type === "number" ? Number(e.target.value) : e.target.value)
          }
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm text-zinc-400">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 outline-none focus:ring-2 focus:ring-white/30"
      />
    </div>
  );
}

function BudgetSlider({ value, onChange }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm text-zinc-400 flex items-center gap-2">
        <Wallet size={16} /> Budget: ${value}
      </label>

      {/* Number input for precise budget entry */}
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mb-3 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter budget"
      />

      {/* Slider for quick adjustment */}
      <input
        type="range"
        min={200}
        max={10000}
        step={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
    </div>
  );
}

/* ---------------- Loading ---------------- */

function LoadingCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-8 rounded-xl bg-zinc-800 p-6"
    >
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-zinc-700 rounded w-1/3" />
        <div className="h-3 bg-zinc-700 rounded w-full" />
        <div className="h-3 bg-zinc-700 rounded w-5/6" />
        <div className="h-3 bg-zinc-700 rounded w-4/6" />
      </div>
    </motion.div>
  );
}

/* ---------------- Result ---------------- */

function ResultCard({ result, onCopy }: { result: string; onCopy: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-8 bg-zinc-800 rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">📍 Your AI Itinerary</h2>

        <button
          onClick={onCopy}
          className="text-zinc-400 hover:text-white transition"
        >
          <Copy size={18} />
        </button>
      </div>

      <div className="text-zinc-300 whitespace-pre-line leading-relaxed">
        {result}
      </div>
    </motion.div>
  );
}
