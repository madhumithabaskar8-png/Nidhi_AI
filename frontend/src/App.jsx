// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Bell,
//   Bot,
//   Check,
//   ChevronDown,
//   ChevronRight,
//   DollarSign,
//   Globe,
//   Loader2,
//   LogIn,
//   MessageCircle,
//   Plus,
//   Send,
//   ShieldCheck,
//   ShieldAlert,
//   Trash2,
//   User,
//   X,
// } from "lucide-react";

// /* ──────────────────────────── constants ──────────────────────────── */

// const API = "http://127.0.0.1:8000";

// /* ───────────────── multilingual dictionary ───────────────── */

// const DICT = {
//   en: {
//     appName: "Nidhi AI",
//     tagline: "Your Personal Finance Guardian",
//     getStarted: "Login / Get Started",
//     langLabel: "Language",
//     onboardTitle: "Create Your Profile",
//     name: "Name",
//     job: "Job / Gig Type",
//     phone: "Phone Number",
//     language: "Language",
//     submit: "Submit",
//     salaryLabel: "This Month Salary (₹)",
//     savingsLabel: "Monthly Savings Target (₹)",
//     updateFinancials: "Update",
//     expensesTitle: "Your Expenses",
//     expTitle: "Expense Title",
//     expAmount: "Amount (₹)",
//     expDue: "Due Date",
//     next: "Next",
//     complete: "Complete",
//     dashboard: "Dashboard",
//     profile: "Profile",
//     riskScore: "Risk Score",
//     riskLevel: "Risk Level",
//     low: "LOW",
//     high: "HIGH",
//     recommendations: "Recommendations",
//     rewards: "Rewards",
//     expenses: "Expenses",
//     paid: "Paid",
//     pending: "Pending",
//     savingsProjection: "6-Month Savings Projection",
//     notifications: "Notifications",
//     noNotifications: "No urgent dues!",
//     askNidhi: "Ask Nidhi AI",
//     chatPlaceholder: "Ask about your finances…",
//     month: "Month",
//     addedExpenses: "Added Expenses",
//     noExpensesYet: "No expenses added yet.",
//     financials: "Income & Savings",
//     expenseInput: "Add Expenses",
//   },
//   hi: {
//     appName: "निधि AI",
//     tagline: "आपका व्यक्तिगत वित्त संरक्षक",
//     getStarted: "लॉगिन / शुरू करें",
//     langLabel: "भाषा",
//     onboardTitle: "अपनी प्रोफ़ाइल बनाएं",
//     name: "नाम",
//     job: "नौकरी / गिग प्रकार",
//     phone: "फ़ोन नंबर",
//     language: "भाषा",
//     submit: "जमा करें",
//     salaryLabel: "इस माह का वेतन (₹)",
//     savingsLabel: "मासिक बचत लक्ष्य (₹)",
//     updateFinancials: "अपडेट करें",
//     expensesTitle: "आपके खर्चे",
//     expTitle: "खर्चे का शीर्षक",
//     expAmount: "राशि (₹)",
//     expDue: "देय तिथि",
//     next: "अगला",
//     complete: "पूरा करें",
//     dashboard: "डैशबोर्ड",
//     profile: "प्रोफ़ाइल",
//     riskScore: "जोखिम स्कोर",
//     riskLevel: "जोखिम स्तर",
//     low: "कम",
//     high: "अधिक",
//     recommendations: "सिफ़ारिशें",
//     rewards: "पुरस्कार",
//     expenses: "खर्चे",
//     paid: "भुगतान",
//     pending: "लंबित",
//     savingsProjection: "6 माह बचत प्रक्षेपण",
//     notifications: "सूचनाएं",
//     noNotifications: "कोई तत्काल देय नहीं!",
//     askNidhi: "निधि AI से पूछें",
//     chatPlaceholder: "अपने वित्त के बारे में पूछें…",
//     month: "माह",
//     addedExpenses: "जोड़े गए खर्चे",
//     noExpensesYet: "अभी तक कोई खर्चा नहीं जोड़ा।",
//     financials: "आय और बचत",
//     expenseInput: "खर्चे जोड़ें",
//   },
//   ta: {
//     appName: "நிதி AI",
//     tagline: "உங்கள் தனிப்பட்ட நிதி பாதுகாவலர்",
//     getStarted: "உள்நுழை / தொடங்கு",
//     langLabel: "மொழி",
//     onboardTitle: "உங்கள் சுயவிவரத்தை உருவாக்கவும்",
//     name: "பெயர்",
//     job: "வேலை / தொழில் வகை",
//     phone: "தொலைபேசி எண்",
//     language: "மொழி",
//     submit: "சமர்ப்பிக்கவும்",
//     salaryLabel: "இந்த மாத சம்பளம் (₹)",
//     savingsLabel: "மாதாந்திர சேமிப்பு இலக்கு (₹)",
//     updateFinancials: "புதுப்பிக்கவும்",
//     expensesTitle: "உங்கள் செலவுகள்",
//     expTitle: "செலவு தலைப்பு",
//     expAmount: "தொகை (₹)",
//     expDue: "நிலுவை தேதி",
//     next: "அடுத்து",
//     complete: "முடிக்கவும்",
//     dashboard: "டாஷ்போர்ட்",
//     profile: "சுயவிவரம்",
//     riskScore: "ஆபத்து மதிப்பெண்",
//     riskLevel: "ஆபத்து நிலை",
//     low: "குறைவு",
//     high: "அதிகம்",
//     recommendations: "பரிந்துரைகள்",
//     rewards: "வெகுமதிகள்",
//     expenses: "செலவுகள்",
//     paid: "செலுத்தப்பட்டது",
//     pending: "நிலுவையில்",
//     savingsProjection: "6 மாத சேமிப்பு கணிப்பு",
//     notifications: "அறிவிப்புகள்",
//     noNotifications: "அவசர நிலுவைகள் இல்லை!",
//     askNidhi: "நிதி AI-யிடம் கேளுங்கள்",
//     chatPlaceholder: "உங்கள் நிதி பற்றி கேளுங்கள்…",
//     month: "மாதம்",
//     addedExpenses: "சேர்க்கப்பட்ட செலவுகள்",
//     noExpensesYet: "இன்னும் செலவுகள் சேர்க்கப்படவில்லை.",
//     financials: "வருமானம் & சேமிப்பு",
//     expenseInput: "செலவுகளை சேர்க்கவும்",
//   },
// };

// const LANG_OPTIONS = [
//   { code: "en", label: "English" },
//   { code: "hi", label: "हिन्दी" },
//   { code: "ta", label: "தமிழ்" },
// ];

// /* ──────────────────────── helper: fetch wrapper ──────────────────── */

// async function api(path, opts = {}) {
//   const res = await fetch(`${API}${path}`, {
//     headers: { "Content-Type": "application/json", ...opts.headers },
//     ...opts,
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.detail || res.statusText);
//   }
//   return res.json();
// }

// /* ────────────────────── tiny bar chart component ─────────────────── */

// function BarChart({ data, label, t }) {
//   const max = Math.max(...data, 1);
//   return (
//     <div className="flex items-end gap-3 h-48 mt-4">
//       {data.map((v, i) => (
//         <div key={i} className="flex flex-col items-center flex-1 gap-1">
//           <span className="text-xs font-semibold text-indigo-700">
//             ₹{v.toLocaleString()}
//           </span>
//           <div
//             className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-300 transition-all duration-500"
//             style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
//           />
//           <span className="text-[11px] text-gray-500">
//             {label} {i + 1}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ─────────────────── risk gauge (SVG arc) component ──────────────── */

// function RiskGauge({ score, level, t: tr }) {
//   const radius = 70;
//   const stroke = 14;
//   const normalizedRadius = radius - stroke / 2;
//   const circumference = Math.PI * normalizedRadius; // half-circle
//   const offset = circumference - (score / 100) * circumference;
//   const isHigh = level === "HIGH";
//   const color = isHigh ? "#ef4444" : "#22c55e";

//   return (
//     <div className="flex flex-col items-center">
//       <svg height={radius + 10} width={radius * 2 + 10} className="overflow-visible">
//         {/* background arc */}
//         <path
//           d={`M ${stroke / 2 + 5},${radius + 5} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2 + 5},${radius + 5}`}
//           fill="none"
//           stroke="#e5e7eb"
//           strokeWidth={stroke}
//           strokeLinecap="round"
//         />
//         {/* value arc */}
//         <path
//           d={`M ${stroke / 2 + 5},${radius + 5} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2 + 5},${radius + 5}`}
//           fill="none"
//           stroke={color}
//           strokeWidth={stroke}
//           strokeDasharray={`${circumference}`}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           className="transition-all duration-700"
//         />
//       </svg>
//       <div className="-mt-10 text-center">
//         <p className="text-4xl font-extrabold" style={{ color }}>
//           {score}
//         </p>
//         <p className="text-sm font-semibold text-gray-500 tracking-wide">
//           {tr.riskLevel}:{" "}
//           <span style={{ color }}>{isHigh ? tr.high : tr.low}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════ MAIN APP ══════════════════════════════ */

// export default function App() {
//   /* ---- global state ---- */
//   const [lang, setLang] = useState("en");
//   const tr = DICT[lang];

//   const [view, setView] = useState("landing"); // landing | onboard | expenses | dashboard
//   const [userId, setUserId] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);

//   /* ---- onboard form ---- */
//   const [obName, setObName] = useState("");
//   const [obJob, setObJob] = useState("");
//   const [obPhone, setObPhone] = useState("");

//   /* ---- financials ---- */
//   const [salary, setSalary] = useState("");
//   const [savings, setSavings] = useState("");

//   /* ---- expense input ---- */
//   const [expTitle, setExpTitle] = useState("");
//   const [expAmt, setExpAmt] = useState("");
//   const [expDue, setExpDue] = useState("");
//   const [tempExpenses, setTempExpenses] = useState([]);

//   /* ---- dashboard data ---- */
//   const [dashboard, setDashboard] = useState(null);
//   const [expensesList, setExpensesList] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifDrop, setShowNotifDrop] = useState(false);

//   /* ---- chatbot ---- */
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatMsg, setChatMsg] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatEndRef = useRef(null);

//   /* ---- loading flag ---- */
//   const [loading, setLoading] = useState(false);

//   /* ---- helpers: fetch dashboard data ---- */
//   const fetchDashboard = useCallback(async (uid) => {
//     const [dash, exps, notifs] = await Promise.all([
//       api(`/api/users/${uid}/dashboard`),
//       api(`/api/users/${uid}/expenses`),
//       api(`/api/users/${uid}/notifications`),
//     ]);
//     setDashboard(dash);
//     setExpensesList(exps);
//     setNotifications(notifs.pending_soon);
//   }, []);

//   const fetchProfile = useCallback(async (uid) => {
//     const u = await api(`/api/users/${uid}`);
//     setUserProfile(u);
//   }, []);

//   /* scroll chat to bottom */
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   /* ──────────── handlers ──────────── */

//   const handleOnboard = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const user = await api("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//           name: obName,
//           job: obJob,
//           phone: obPhone,
//           language: lang,
//         }),
//       });
//       setUserId(user.id);
//       setUserProfile(user);
//       setView("expenses");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFinancials = async () => {
//     if (!salary || !savings) return;
//     setLoading(true);
//     try {
//       const updated = await api(`/api/users/${userId}/financials`, {
//         method: "PUT",
//         body: JSON.stringify({
//           monthly_salary: Number(salary),
//           monthly_savings: Number(savings),
//         }),
//       });
//       setUserProfile(updated);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddExpense = () => {
//     if (!expTitle || !expAmt || !expDue) return;
//     setTempExpenses((prev) => [
//       ...prev,
//       { title: expTitle, amount: Number(expAmt), due_date: expDue, status: "pending" },
//     ]);
//     setExpTitle("");
//     setExpAmt("");
//     setExpDue("");
//   };

//   const handleRemoveTemp = (idx) => {
//     setTempExpenses((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleComplete = async () => {
//     setLoading(true);
//     try {
//       if (!salary || !savings) {
//         alert("Please update salary & savings target first.");
//         setLoading(false);
//         return;
//       }
//       await handleFinancials();
//       if (tempExpenses.length > 0) {
//         await api(`/api/users/${userId}/expenses`, {
//           method: "POST",
//           body: JSON.stringify({ expenses: tempExpenses }),
//         });
//       }
//       await fetchProfile(userId);
//       await fetchDashboard(userId);
//       setView("dashboard");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpenseStatus = async (exp) => {
//     const newStatus = exp.status === "paid" ? "pending" : "paid";
//     try {
//       await api(`/api/expenses/${exp.id}/status`, {
//         method: "PATCH",
//         body: JSON.stringify({ status: newStatus }),
//       });
//       await fetchDashboard(userId);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const sendChat = async () => {
//     if (!chatMsg.trim()) return;
//     const userMsg = chatMsg.trim();
//     setChatHistory((h) => [...h, { role: "user", text: userMsg }]);
//     setChatMsg("");
//     try {
//       const res = await api("/api/chatbot", {
//         method: "POST",
//         body: JSON.stringify({ user_id: userId, message: userMsg }),
//       });
//       setChatHistory((h) => [...h, { role: "bot", text: res.reply }]);
//     } catch {
//       setChatHistory((h) => [
//         ...h,
//         { role: "bot", text: "Sorry, something went wrong." },
//       ]);
//     }
//   };

//   /* ──────────────────────── RENDER ──────────────────────── */

//   /* ---- shared header ---- */
//   const Header = ({ showBell = false }) => (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
//       <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* logo */}
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//             <DollarSign className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             {tr.appName}
//           </span>
//         </div>

//         <div className="flex items-center gap-3">
//           {/* notifications bell */}
//           {showBell && (
//             <div className="relative">
//               <button
//                 onClick={() => setShowNotifDrop((p) => !p)}
//                 className="relative p-2 rounded-full hover:bg-gray-100 transition"
//               >
//                 <Bell className="w-5 h-5 text-gray-600" />
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//               {showNotifDrop && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
//                   <h4 className="font-semibold text-sm mb-3 text-gray-700">
//                     {tr.notifications}
//                   </h4>
//                   {notifications.length === 0 ? (
//                     <p className="text-sm text-gray-400">{tr.noNotifications}</p>
//                   ) : (
//                     <ul className="space-y-2 max-h-60 overflow-y-auto">
//                       {notifications.map((n) => (
//                         <li
//                           key={n.expense_id}
//                           className="flex justify-between items-center bg-red-50 rounded-lg px-3 py-2"
//                         >
//                           <div>
//                             <p className="text-sm font-medium text-red-700">
//                               {n.title}
//                             </p>
//                             <p className="text-xs text-red-500">
//                               ₹{n.amount.toLocaleString()} · {n.hours_remaining.toFixed(1)}h left
//                             </p>
//                           </div>
//                           <ShieldAlert className="w-4 h-4 text-red-400" />
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* language selector */}
//           <div className="relative">
//             <select
//               value={lang}
//               onChange={(e) => setLang(e.target.value)}
//               className="appearance-none bg-gray-100 text-sm rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
//             >
//               {LANG_OPTIONS.map((l) => (
//                 <option key={l.code} value={l.code}>
//                   {l.label}
//                 </option>
//               ))}
//             </select>
//             <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//             <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   /* ==================== LANDING PAGE ==================== */
//   if (view === "landing") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <Header />
//         <main className="flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
//           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 shadow-xl shadow-indigo-200">
//             <DollarSign className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             {tr.appName}
//           </h1>
//           <p className="text-lg text-gray-500 mb-10 max-w-md">
//             {tr.tagline}
//           </p>
//           <button
//             onClick={() => setView("onboard")}
//             className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95"
//           >
//             <LogIn className="w-5 h-5" />
//             {tr.getStarted}
//           </button>
//         </main>
//       </div>
//     );
//   }

//   /* ==================== ONBOARDING ==================== */
//   if (view === "onboard") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <Header />
//         <main className="flex items-center justify-center px-4 py-16">
//           <form
//             onSubmit={handleOnboard}
//             className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-5 border border-gray-100"
//           >
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <User className="w-6 h-6 text-indigo-500" />
//               {tr.onboardTitle}
//             </h2>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">{tr.name}</label>
//               <input
//                 required
//                 value={obName}
//                 onChange={(e) => setObName(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">{tr.job}</label>
//               <input
//                 value={obJob}
//                 onChange={(e) => setObJob(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">{tr.phone}</label>
//               <input
//                 value={obPhone}
//                 onChange={(e) => setObPhone(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">{tr.language}</label>
//               <select
//                 value={lang}
//                 onChange={(e) => setLang(e.target.value)}
//                 className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               >
//                 {LANG_OPTIONS.map((l) => (
//                   <option key={l.code} value={l.code}>
//                     {l.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   <ChevronRight className="w-5 h-5" />
//                   {tr.submit}
//                 </>
//               )}
//             </button>
//           </form>
//         </main>
//       </div>
//     );
//   }

//   /* ==================== EXPENSES & INCOME INPUT ==================== */
//   if (view === "expenses") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <Header />
//         <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
//           {/* Financials */}
//           <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <DollarSign className="w-5 h-5 text-indigo-500" />
//               {tr.financials}
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   {tr.salaryLabel}
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={salary}
//                   onChange={(e) => setSalary(e.target.value)}
//                   className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   {tr.savingsLabel}
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={savings}
//                   onChange={(e) => setSavings(e.target.value)}
//                   className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Expense Input */}
//           <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Plus className="w-5 h-5 text-indigo-500" />
//               {tr.expenseInput}
//             </h3>
//             <div className="grid grid-cols-3 gap-3 mb-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">
//                   {tr.expTitle}
//                 </label>
//                 <input
//                   value={expTitle}
//                   onChange={(e) => setExpTitle(e.target.value)}
//                   className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">
//                   {tr.expAmount}
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={expAmt}
//                   onChange={(e) => setExpAmt(e.target.value)}
//                   className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">
//                   {tr.expDue}
//                 </label>
//                 <input
//                   type="date"
//                   value={expDue}
//                   onChange={(e) => setExpDue(e.target.value)}
//                   className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddExpense}
//                 className="flex-1 border-2 border-indigo-500 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-50 transition active:scale-95 flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 {tr.next}
//               </button>
//               <button
//                 onClick={handleComplete}
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <Check className="w-4 h-4" />
//                     {tr.complete}
//                   </>
//                 )}
//               </button>
//             </div>
//           </section>

//           {/* Temporary expense list */}
//           <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <h4 className="text-sm font-bold text-gray-700 mb-3">
//               {tr.addedExpenses} ({tempExpenses.length})
//             </h4>
//             {tempExpenses.length === 0 ? (
//               <p className="text-sm text-gray-400 italic">{tr.noExpensesYet}</p>
//             ) : (
//               <ul className="space-y-2">
//                 {tempExpenses.map((t, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
//                   >
//                     <div>
//                       <span className="font-medium text-sm text-gray-800">
//                         {t.title}
//                       </span>
//                       <span className="ml-2 text-sm text-gray-500">
//                         ₹{t.amount.toLocaleString()}
//                       </span>
//                       <span className="ml-2 text-xs text-gray-400">
//                         {t.due_date}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveTemp(i)}
//                       className="text-red-400 hover:text-red-600 transition"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//         </main>
//       </div>
//     );
//   }

//   /* ==================== DASHBOARD ==================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
//       <Header showBell />

//       <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
//         {/* ── Profile Banner ── */}
//         {userProfile && (
//           <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
//                 {userProfile.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">{userProfile.name}</h2>
//                 <p className="text-indigo-200 text-sm">
//                   {userProfile.job} · {userProfile.phone}
//                 </p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-5">
//               <div className="bg-white/10 rounded-xl p-3 text-center">
//                 <p className="text-xs text-indigo-200 uppercase tracking-wide">
//                   {tr.salaryLabel}
//                 </p>
//                 <p className="text-xl font-bold">
//                   ₹{userProfile.monthly_salary.toLocaleString()}
//                 </p>
//               </div>
//               <div className="bg-white/10 rounded-xl p-3 text-center">
//                 <p className="text-xs text-indigo-200 uppercase tracking-wide">
//                   {tr.savingsLabel}
//                 </p>
//                 <p className="text-xl font-bold">
//                   ₹{userProfile.monthly_savings.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* ── Risk Gauge + Rewards ── */}
//         {dashboard && (
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* gauge */}
//             <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
//               <h3 className="text-lg font-bold text-gray-800 mb-2">
//                 {tr.riskScore}
//               </h3>
//               <RiskGauge score={dashboard.risk_score} level={dashboard.risk_level} t={tr} />

//               {/* coaching / badge */}
//               <div className="mt-4 w-full">
//                 {dashboard.risk_level === "LOW" ? (
//                   <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-4 py-3">
//                     <ShieldCheck className="w-5 h-5 flex-shrink-0" />
//                     <span className="text-sm font-medium">
//                       🎉 Streak unlocked! You're financially healthy.
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-xl px-4 py-3">
//                     <ShieldAlert className="w-5 h-5 flex-shrink-0" />
//                     <span className="text-sm font-medium">
//                       💪 Don't worry! Small steps lead to big wins. Let's cut one expense today.
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* recommendations & rewards */}
//             <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-5">
//               <div>
//                 <h4 className="text-sm font-bold text-gray-700 mb-2">
//                   {tr.recommendations}
//                 </h4>
//                 <ul className="space-y-1.5">
//                   {dashboard.recommendations.map((r, i) => (
//                     <li
//                       key={i}
//                       className="text-sm text-gray-600 flex items-start gap-2"
//                     >
//                       <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
//                       {r}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-gray-700 mb-2">
//                   {tr.rewards}
//                 </h4>
//                 <ul className="space-y-1.5">
//                   {dashboard.rewards.map((r, i) => (
//                     <li key={i} className="text-sm text-gray-600">
//                       {r}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </section>
//           </div>
//         )}

//         {/* ── Expense Checklist ── */}
//         <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">{tr.expenses}</h3>
//           {expensesList.length === 0 ? (
//             <p className="text-sm text-gray-400 italic">{tr.noExpensesYet}</p>
//           ) : (
//             <ul className="space-y-2">
//               {expensesList.map((exp) => {
//                 const isPaid = exp.status === "paid";
//                 return (
//                   <li
//                     key={exp.id}
//                     className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition-all ${
//                       isPaid
//                         ? "bg-green-50 hover:bg-green-100"
//                         : "bg-red-50 hover:bg-red-100"
//                     }`}
//                     onClick={() => toggleExpenseStatus(exp)}
//                   >
//                     <div className="flex items-center gap-3">
//                       {isPaid ? (
//                         <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
//                           <Check className="w-4 h-4 text-white" />
//                         </div>
//                       ) : (
//                         <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
//                           <X className="w-4 h-4 text-white" />
//                         </div>
//                       )}
//                       <div>
//                         <p className="font-medium text-sm text-gray-800">
//                           {exp.title}
//                         </p>
//                         <p className="text-xs text-gray-400">{exp.due_date}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-sm text-gray-800">
//                         ₹{exp.amount.toLocaleString()}
//                       </p>
//                       <p
//                         className={`text-xs font-medium ${
//                           isPaid ? "text-green-600" : "text-red-500"
//                         }`}
//                       >
//                         {isPaid ? tr.paid : tr.pending}
//                       </p>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </section>

//         {/* ── 6-Month Savings Projection ── */}
//         {dashboard && dashboard.projected_savings && (
//           <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <h3 className="text-lg font-bold text-gray-800">
//               {tr.savingsProjection}
//             </h3>
//             <BarChart
//               data={dashboard.projected_savings}
//               label={tr.month}
//               t={tr}
//             />
//           </section>
//         )}
//       </main>

//       {/* ── FAB: Ask Nidhi AI ── */}
//       <button
//         onClick={() => setChatOpen(true)}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-5 py-3 shadow-2xl flex items-center gap-2 z-50 transition-all active:scale-95"
//       >
//         <Bot className="w-5 h-5" />
//         {tr.askNidhi}
//       </button>

//       {/* ── Chat Drawer ── */}
//       {chatOpen && (
//         <div className="fixed inset-0 z-50 flex justify-end">
//           {/* overlay */}
//           <div
//             className="absolute inset-0 bg-black/30"
//             onClick={() => setChatOpen(false)}
//           />
//           {/* drawer */}
//           <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
//             {/* header */}
//             <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//               <div className="flex items-center gap-2">
//                 <MessageCircle className="w-5 h-5" />
//                 <span className="font-bold">{tr.askNidhi}</span>
//               </div>
//               <button
//                 onClick={() => setChatOpen(false)}
//                 className="hover:bg-white/20 rounded-full p-1 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* messages */}
//             <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
//               {chatHistory.length === 0 && (
//                 <p className="text-sm text-gray-400 text-center mt-10">
//                   {tr.chatPlaceholder}
//                 </p>
//               )}
//               {chatHistory.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${
//                     m.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
//                       m.role === "user"
//                         ? "bg-indigo-600 text-white rounded-br-md"
//                         : "bg-gray-100 text-gray-800 rounded-bl-md"
//                     }`}
//                   >
//                     {m.text}
//                   </div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>

//             {/* input */}
//             <div className="border-t px-4 py-3 flex gap-2">
//               <input
//                 value={chatMsg}
//                 onChange={(e) => setChatMsg(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendChat()}
//                 placeholder={tr.chatPlaceholder}
//                 className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <button
//                 onClick={sendChat}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2.5 transition active:scale-95"
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* inline keyframes for drawer slide-in */}
//       <style>{`
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to   { transform: translateX(0); }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bell,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Globe,
  Loader2,
  LogIn,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  User,
  X,
} from "lucide-react";

/* ──────────────────────────── constants ──────────────────────────── */

const API = "http://127.0.0.1:8000";

/* ───────────────── multilingual dictionary ───────────────── */

const DICT = {
  en: {
    appName: "Nidhi AI",
    tagline: "Your Personal Finance Guardian",
    getStarted: "Login / Get Started",
    langLabel: "Language",
    onboardTitle: "Create Your Profile",
    name: "Name",
    job: "Job / Gig Type",
    phone: "Phone Number",
    language: "Language",
    submit: "Submit",
    salaryLabel: "This Month Salary (₹)",
    savingsLabel: "Monthly Savings Target (₹)",
    updateFinancials: "Update",
    expensesTitle: "Your Expenses",
    expTitle: "Expense Title",
    expAmount: "Amount (₹)",
    expDue: "Due Date",
    next: "Next",
    complete: "Complete",
    dashboard: "Dashboard",
    profile: "Profile",
    riskScore: "Risk Score",
    riskLevel: "Risk Level",
    low: "LOW",
    high: "HIGH",
    recommendations: "Recommendations",
    rewards: "Rewards",
    expenses: "Expenses",
    paid: "Paid",
    pending: "Pending",
    savingsProjection: "6-Month Savings Projection",
    notifications: "Notifications",
    noNotifications: "No urgent dues!",
    askNidhi: "Ask Nidhi AI",
    chatPlaceholder: "Ask about your finances…",
    month: "Month",
    addedExpenses: "Added Expenses",
    noExpensesYet: "No expenses added yet.",
    financials: "Income & Savings",
    expenseInput: "Add Expenses",
  },
  hi: {
    appName: "निधि AI",
    tagline: "आपका व्यक्तिगत वित्त संरक्षक",
    getStarted: "लॉगिन / शुरू करें",
    langLabel: "भाषा",
    onboardTitle: "अपनी प्रोफ़ाइल बनाएं",
    name: "नाम",
    job: "नौकरी / गिग प्रकार",
    phone: "फ़ोन नंबर",
    language: "भाषा",
    submit: "जमा करें",
    salaryLabel: "इस माह का वेतन (₹)",
    savingsLabel: "मासिक बचत लक्ष्य (₹)",
    updateFinancials: "अपडेट करें",
    expensesTitle: "आपके खर्चे",
    expTitle: "खर्चे का शीर्षक",
    expAmount: "राशि (₹)",
    expDue: "देय तिथि",
    next: "अगला",
    complete: "पूरा करें",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    riskScore: "जोखिम स्कोर",
    riskLevel: "जोखिम स्तर",
    low: "कम",
    high: "अधिक",
    recommendations: "सिफ़ारिशें",
    rewards: "पुरस्कार",
    expenses: "खर्चे",
    paid: "भुगतान",
    pending: "लंबित",
    savingsProjection: "6 माह बचत प्रक्षेपण",
    notifications: "सूचनाएं",
    noNotifications: "कोई तत्काल देय नहीं!",
    askNidhi: "निधि AI से पूछें",
    chatPlaceholder: "अपने वित्त के बारे में पूछें…",
    month: "माह",
    addedExpenses: "जोड़े गए खर्चे",
    noExpensesYet: "अभी तक कोई खर्चा नहीं जोड़ा।",
    financials: "आय और बचत",
    expenseInput: "खर्चे जोड़ें",
  },
  ta: {
    appName: "நிதி AI",
    tagline: "உங்கள் தனிப்பட்ட நிதி பாதுகாவலர்",
    getStarted: "உள்நுழை / தொடங்கு",
    langLabel: "மொழி",
    onboardTitle: "உங்கள் சுயவிவரத்தை உருவாக்கவும்",
    name: "பெயர்",
    job: "வேலை / தொழில் வகை",
    phone: "தொலைபேசி எண்",
    language: "மொழி",
    submit: "சமர்ப்பிக்கவும்",
    salaryLabel: "இந்த மாத சம்பளம் (₹)",
    savingsLabel: "மாதாந்திர சேமிப்பு இலக்கு (₹)",
    updateFinancials: "புதுப்பிக்கவும்",
    expensesTitle: "உங்கள் செலவுகள்",
    expTitle: "செலவு தலைப்பு",
    expAmount: "தொகை (₹)",
    expDue: "நிலுவை தேதி",
    next: "அடுத்து",
    complete: "முடிக்கவும்",
    dashboard: "டாஷ்போர்ட்",
    profile: "சுயவிவரம்",
    riskScore: "ஆபத்து மதிப்பெண்",
    riskLevel: "ஆபத்து நிலை",
    low: "குறைவு",
    high: "அதிகம்",
    recommendations: "பரிந்துரைகள்",
    rewards: "வெகுமதிகள்",
    expenses: "செலவுகள்",
    paid: "செலுத்தப்பட்டது",
    pending: "நிலுவையில்",
    savingsProjection: "6 மாத சேமிப்பு கணிப்பு",
    notifications: "அறிவிப்புகள்",
    noNotifications: "அவசர நிலுவைகள் இல்லை!",
    askNidhi: "நிதி AI-யிடம் கேளுங்கள்",
    chatPlaceholder: "உங்கள் நிதி பற்றி கேளுங்கள்…",
    month: "மாதம்",
    addedExpenses: "சேர்க்கப்பட்ட செலவுகள்",
    noExpensesYet: "இன்னும் செலவுகள் சேர்க்கப்படவில்லை.",
    financials: "வருமானம் & சேமிப்பு",
    expenseInput: "செலவுகளை சேர்க்கவும்",
  },
};

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
];

/* ──────────────────────── helper: fetch wrapper ──────────────────── */

async function api(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  return res.json();
}

/* ────────────────────── tiny bar chart component ─────────────────── */

function BarChart({ data, label, t }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-3 h-48 mt-4">
      {data.map((v, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs font-semibold text-indigo-700">
            ₹{v.toLocaleString()}
          </span>
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-300 transition-all duration-500"
            style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
          />
          <span className="text-[11px] text-gray-500">
            {label} {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── risk gauge (SVG arc) component ──────────────── */

function RiskGauge({ score, level, t: tr }) {
  const radius = 70;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // half-circle
  const offset = circumference - (score / 100) * circumference;
  const isHigh = level === "HIGH";
  const color = isHigh ? "#ef4444" : "#22c55e";

  return (
    <div className="flex flex-col items-center">
      <svg height={radius + 10} width={radius * 2 + 10} className="overflow-visible">
        {/* background arc */}
        <path
          d={`M ${stroke / 2 + 5},${radius + 5} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2 + 5},${radius + 5}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* value arc */}
        <path
          d={`M ${stroke / 2 + 5},${radius + 5} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2 + 5},${radius + 5}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="-mt-10 text-center">
        <p className="text-4xl font-extrabold" style={{ color }}>
          {score}
        </p>
        <p className="text-sm font-semibold text-gray-500 tracking-wide">
          {tr.riskLevel}:{" "}
          <span style={{ color }}>{isHigh ? tr.high : tr.low}</span>
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════════ */

export default function App() {
  /* ---- global state ---- */
  const [lang, setLang] = useState("en");
  const tr = DICT[lang];

  const [view, setView] = useState("landing"); // landing | onboard | expenses | dashboard
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  /* ---- onboard form ---- */
  const [obName, setObName] = useState("");
  const [obJob, setObJob] = useState("");
  const [obPhone, setObPhone] = useState("");

  /* ---- financials ---- */
  const [salary, setSalary] = useState("");
  const [savings, setSavings] = useState("");

  /* ---- expense input ---- */
  const [expTitle, setExpTitle] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [expDue, setExpDue] = useState("");
  const [tempExpenses, setTempExpenses] = useState([]);

  /* ---- dashboard data ---- */
  const [dashboard, setDashboard] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDrop, setShowNotifDrop] = useState(false);

  /* ---- chatbot ---- */
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  /* ---- loading flag ---- */
  const [loading, setLoading] = useState(false);

  /* ---- helpers: fetch dashboard data ---- */
  const fetchDashboard = useCallback(async (uid) => {
    const [dash, exps, notifs] = await Promise.all([
      api(`/api/users/${uid}/dashboard`),
      api(`/api/users/${uid}/expenses`),
      api(`/api/users/${uid}/notifications`),
    ]);
    setDashboard(dash);
    setExpensesList(exps);
    setNotifications(notifs.pending_soon);
  }, []);

  const fetchProfile = useCallback(async (uid) => {
    const u = await api(`/api/users/${uid}`);
    setUserProfile(u);
  }, []);

  /* scroll chat to bottom */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  /* ──────────── handlers ──────────── */

  const handleOnboard = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: obName,
          job: obJob,
          phone: obPhone,
          language: lang,
        }),
      });
      setUserId(user.id);
      setUserProfile(user);
      setView("expenses");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinancials = async () => {
    if (!salary || !savings) return;
    setLoading(true);
    try {
      const updated = await api(`/api/users/${userId}/financials`, {
        method: "PUT",
        body: JSON.stringify({
          monthly_salary: Number(salary),
          monthly_savings: Number(savings),
        }),
      });
      setUserProfile(updated);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    if (!expTitle || !expAmt || !expDue) return;
    setTempExpenses((prev) => [
      ...prev,
      { title: expTitle, amount: Number(expAmt), due_date: expDue, status: "pending" },
    ]);
    setExpTitle("");
    setExpAmt("");
    setExpDue("");
  };

  const handleRemoveTemp = (idx) => {
    setTempExpenses((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (!salary || !savings) {
        alert("Please update salary & savings target first.");
        setLoading(false);
        return;
      }
      await handleFinancials();
      if (tempExpenses.length > 0) {
        await api(`/api/users/${userId}/expenses`, {
          method: "POST",
          body: JSON.stringify({ expenses: tempExpenses }),
        });
      }
      await fetchProfile(userId);
      await fetchDashboard(userId);
      setView("dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpenseStatus = async (exp) => {
    const newStatus = exp.status === "paid" ? "pending" : "paid";
    try {
      await api(`/api/expenses/${exp.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchDashboard(userId);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg.trim();
    setChatHistory((h) => [...h, { role: "user", text: userMsg }]);
    setChatMsg("");
    try {
      const res = await api("/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ user_id: userId, message: userMsg }),
      });
      setChatHistory((h) => [...h, { role: "bot", text: res.reply }]);
    } catch {
      setChatHistory((h) => [
        ...h,
        { role: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  /* ──────────────────────── RENDER ──────────────────────── */

  /* ---- shared header ---- */
  const Header = ({ showBell = false }) => (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {tr.appName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* notifications bell */}
          {showBell && (
            <div className="relative">
              <button
                onClick={() => setShowNotifDrop((p) => !p)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifDrop && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">
                    {tr.notifications}
                  </h4>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400">{tr.noNotifications}</p>
                  ) : (
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.expense_id}
                          className="flex justify-between items-center bg-red-50 rounded-lg px-3 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium text-red-700">
                              {n.title}
                            </p>
                            <p className="text-xs text-red-500">
                              ₹{n.amount.toLocaleString()} · {n.hours_remaining.toFixed(1)}h left
                            </p>
                          </div>
                          <ShieldAlert className="w-4 h-4 text-red-400" />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* language selector */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-gray-100 text-sm font-semibold text-gray-900 rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              {LANG_OPTIONS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );

  /* ==================== LANDING PAGE ==================== */
  if (view === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <main className="flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 shadow-xl shadow-indigo-200">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {tr.appName}
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-md">
            {tr.tagline}
          </p>
          <button
            onClick={() => setView("onboard")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            {tr.getStarted}
          </button>
        </main>
      </div>
    );
  }

  /* ==================== ONBOARDING ==================== */
  if (view === "onboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <main className="flex items-center justify-center px-4 py-16">
          <form
            onSubmit={handleOnboard}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-5 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <User className="w-6 h-6 text-indigo-500" />
              {tr.onboardTitle}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{tr.name}</label>
              <input
                required
                value={obName}
                onChange={(e) => setObName(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{tr.job}</label>
              <input
                value={obJob}
                onChange={(e) => setObJob(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{tr.phone}</label>
              <input
                value={obPhone}
                onChange={(e) => setObPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{tr.language}</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {LANG_OPTIONS.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ChevronRight className="w-5 h-5" />
                  {tr.submit}
                </>
              )}
            </button>
          </form>
        </main>
      </div>
    );
  }

  /* ==================== EXPENSES & INCOME INPUT ==================== */
  if (view === "expenses") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          {/* Financials */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-500" />
              {tr.financials}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {tr.salaryLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {tr.savingsLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  className="w-full border rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </section>

          {/* Expense Input */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              {tr.expenseInput}
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {tr.expTitle}
                </label>
                <input
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {tr.expAmount}
                </label>
                <input
                  type="number"
                  min="0"
                  value={expAmt}
                  onChange={(e) => setExpAmt(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {tr.expDue}
                </label>
                <input
                  type="date"
                  value={expDue}
                  onChange={(e) => setExpDue(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddExpense}
                className="flex-1 border-2 border-indigo-500 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-50 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {tr.next}
              </button>
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {tr.complete}
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Temporary expense list */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-3">
              {tr.addedExpenses} ({tempExpenses.length})
            </h4>
            {tempExpenses.length === 0 ? (
              <p className="text-sm text-gray-400 italic">{tr.noExpensesYet}</p>
            ) : (
              <ul className="space-y-2">
                {tempExpenses.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
                  >
                    <div>
                      <span className="font-medium text-sm text-gray-800">
                        {t.title}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ₹{t.amount.toLocaleString()}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {t.due_date}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveTemp(i)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    );
  }

  /* ==================== DASHBOARD ==================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      <Header showBell />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* ── Profile Banner ── */}
        {userProfile && (
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-indigo-200 text-sm">
                  {userProfile.job} · {userProfile.phone}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-xs text-indigo-200 uppercase tracking-wide">
                  {tr.salaryLabel}
                </p>
                <p className="text-xl font-bold">
                  ₹{userProfile.monthly_salary.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-xs text-indigo-200 uppercase tracking-wide">
                  {tr.savingsLabel}
                </p>
                <p className="text-xl font-bold">
                  ₹{userProfile.monthly_savings.toLocaleString()}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Risk Gauge + Rewards ── */}
        {dashboard && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* gauge */}
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {tr.riskScore}
              </h3>
              <RiskGauge score={dashboard.risk_score} level={dashboard.risk_level} t={tr} />

              {/* coaching / badge */}
              <div className="mt-4 w-full">
                {dashboard.risk_level === "LOW" ? (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-4 py-3">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      🎉 Streak unlocked! You're financially healthy.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-xl px-4 py-3">
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      💪 Don't worry! Small steps lead to big wins. Let's cut one expense today.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* recommendations & rewards */}
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-5">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  {tr.recommendations}
                </h4>
                <ul className="space-y-1.5">
                  {dashboard.recommendations.map((r, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  {tr.rewards}
                </h4>
                <ul className="space-y-1.5">
                  {dashboard.rewards.map((r, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* ── Expense Checklist ── */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{tr.expenses}</h3>
          {expensesList.length === 0 ? (
            <p className="text-sm text-gray-400 italic">{tr.noExpensesYet}</p>
          ) : (
            <ul className="space-y-2">
              {expensesList.map((exp) => {
                const isPaid = exp.status === "paid";
                return (
                  <li
                    key={exp.id}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition-all ${
                      isPaid
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-red-50 hover:bg-red-100"
                    }`}
                    onClick={() => toggleExpenseStatus(exp)}
                  >
                    <div className="flex items-center gap-3">
                      {isPaid ? (
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {exp.title}
                        </p>
                        <p className="text-xs text-gray-400">{exp.due_date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-800">
                        ₹{exp.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          isPaid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isPaid ? tr.paid : tr.pending}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ── 6-Month Savings Projection ── */}
        {dashboard && dashboard.projected_savings && (
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">
              {tr.savingsProjection}
            </h3>
            <BarChart
              data={dashboard.projected_savings}
              label={tr.month}
              t={tr}
            />
          </section>
        )}
      </main>

      {/* ── FAB: Ask Nidhi AI ── */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-5 py-3 shadow-2xl flex items-center gap-2 z-50 transition-all active:scale-95"
      >
        <Bot className="w-5 h-5" />
        {tr.askNidhi}
      </button>

      {/* ── Chat Drawer ── */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setChatOpen(false)}
          />
          {/* drawer */}
          <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold">{tr.askNidhi}</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {chatHistory.length === 0 && (
                <p className="text-sm text-gray-400 text-center mt-10">
                  {tr.chatPlaceholder}
                </p>
              )}
              {chatHistory.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* input */}
            <div className="border-t px-4 py-3 flex gap-2">
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder={tr.chatPlaceholder}
                className="flex-1 border rounded-xl px-4 py-2.5 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={sendChat}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2.5 transition active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* inline keyframes for drawer slide-in */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
