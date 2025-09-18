"use client"
import { motion } from "framer-motion";
import { Github, Cpu, Package, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const stats = [
  { id: 1, label: "Open Source", value: "Community-first", icon: Github },
  { id: 2, label: "Lightweight", value: "Blazing fast", icon: Cpu },
  { id: 3, label: "Extensible", value: "Plugins & SDKs", icon: Package },
];

type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions:string
};

export default function AboutPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/ParagGhatage/ZeroML/contributors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContributors(data);
        }
      })
      .catch((err) => console.error("Failed to fetch contributors", err));
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0b0f14] text-slate-200 relative overflow-hidden mt-10">
       {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-orange-500">Zero</span>
          <span
            className="text-black"
            style={{
              WebkitTextStroke: "0.8px white", // thin white outline around ML
            }}
          >
            ML
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed"
        >
          A modern, open-source toolkit designed to simplify and accelerate
          machine learning development. ZeroML helps you move from idea to
          production without friction.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#071019] to-[#0f1720] p-8 rounded-2xl border border-slate-800/60 shadow-2xl"
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            We believe building machine learning applications should feel intuitive,
            reproducible, and fun. ZeroML strips away complexity by providing
            opinionated defaults, extensible modules, and clean APIs - so you can
            focus on solving real problems, not configuring infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#071019] to-[#0f1720] p-8 rounded-2xl border border-slate-800/60 shadow-2xl"
        >
          <h2 className="text-3xl font-bold">Who We Serve</h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Whether you’re a solo developer experimenting with ideas, a startup
            building products, or a research team prototyping models - ZeroML is
            designed to adapt to your workflow, scale with your needs, and stay
            lightweight at every stage.
          </p>
        </motion.div>
      </section>

      {/* Core Values / Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">What Defines Us</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                whileHover={{ y: -6 }}
                className="rounded-xl p-6 bg-gradient-to-br from-[#07121a]/40 to-transparent border border-slate-800/50 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-md bg-slate-800/40 ring-1 ring-slate-700/40">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <p className="text-lg font-semibold">{s.label}</p>
                <p className="text-slate-400">{s.value}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">Our Philosophy</h2>
        <p className="mt-6 text-slate-400 leading-relaxed">
          Keep interfaces minimal. Optimize for developer flow. Treat reproducibility
          as a first-class feature. We value clarity, speed, and extensibility - and
          we believe tools should empower you without getting in your way.
        </p>

        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          {["Production-ready", "Friendly DX", "Small footprint", "Composable"].map(
            (tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/30 ring-1 ring-slate-700/40 text-sm"
              >
                {tag}
              </motion.span>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-6 py-20 pb-5 text-center">
  <h2 className="text-3xl md:text-4xl font-bold">Our Contributors</h2>
  <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
    ZeroML is built in the open by passionate developers. Every commit, issue, and
    idea pushes the project forward. Here are some of the amazing people shaping it.
  </p>

        
      </section>
      
          <section
          className=" mb-10">
      {contributors.length > 0 ? (
        <div className=" flex flex-wrap justify-center gap-6">
          {contributors.map((contrib) => (
            <motion.a
  key={contrib.id}
  whileHover={{ y: -5, scale: 1.03 }}
  href={contrib.html_url}
  target="_blank"
  className={`flex flex-col items-center w-32 p-4 rounded-xl shadow-lg text-center border ${
    ["ParagGhatage", "prthm20"].includes(contrib.login)
      ? "border-yellow-400" // gold border for creators
      : "border-slate-800/50 bg-gradient-to-br from-[#07121a]/40 to-transparent"
  }`}
>
  <Image
    src={contrib.avatar_url}
    alt={contrib.login}
    width={80}
    height={80}
    className="rounded-full ring-1 ring-slate-700/40 mb-2"
    unoptimized
  />
  <span className="font-semibold text-slate-200">{contrib.login}</span>
  <span className="text-sm text-slate-400">{contrib.contributions} commits</span>
</motion.a>

          ))}
        </div>
      ) : (
        <p className="text-slate-500 mt-6">Loading contributors...</p>
      )}
    </section>
    </main>
  );
}
