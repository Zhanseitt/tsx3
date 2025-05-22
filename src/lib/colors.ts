export const TASK_COLORS = [
    { name: "Default", bg: "bg-white", border: "border-slate-300", text: "text-slate-800" },
    { name: "Rose", bg: "bg-rose-100", border: "border-rose-300", text: "text-rose-800" },
    { name: "Pink", bg: "bg-pink-100", border: "border-pink-300", text: "text-pink-800" },
    { name: "Fuchsia", bg: "bg-fuchsia-100", border: "border-fuchsia-300", text: "text-fuchsia-800" },
    { name: "Purple", bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-800" },
    { name: "Violet", bg: "bg-violet-100", border: "border-violet-300", text: "text-violet-800" },
    { name: "Indigo", bg: "bg-indigo-100", border: "border-indigo-300", text: "text-indigo-800" },
    { name: "Blue", bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-800" },
    { name: "Sky", bg: "bg-sky-100", border: "border-sky-300", text: "text-sky-800" },
    { name: "Cyan", bg: "bg-cyan-100", border: "border-cyan-300", text: "text-cyan-800" },
    { name: "Teal", bg: "bg-teal-100", border: "border-teal-300", text: "text-teal-800" },
    { name: "Emerald", bg: "bg-emerald-100", border: "border-emerald-300", text: "text-emerald-800" },
    { name: "Green", bg: "bg-green-100", border: "border-green-300", text: "text-green-800" },
    { name: "Lime", bg: "bg-lime-100", border: "border-lime-300", text: "text-lime-800" },
    { name: "Yellow", bg: "bg-yellow-100", border: "border-yellow-300", text: "text-yellow-800" },
    { name: "Amber", bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-800" },
    { name: "Orange", bg: "bg-orange-100", border: "border-orange-300", text: "text-orange-800" },
    { name: "Slate", bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-800" },
  ] as const;
  
  export type TaskColor = typeof TASK_COLORS[number];