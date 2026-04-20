export const user = {
  firstName: "Jordan",
  fullName: "Jordan Lee",
  avatarInitials: "JL",
  avatarUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
  timezone: "America/Los_Angeles",
  memberSince: "March 2024",
  email: "jordan@momentum.app",
  plan: "Momentum Plus",
  tier: "Gold" as const,
  tierXp: 7420,
  tierXpNext: 10000,
};

/** AI-style insight refreshed daily in-product */
export const personalizedInsight = {
  headline: "2.3× deep work before 11 AM vs PM.",
  chips: ["AM peak", "HRV aligned", "90m block"] as const,
  confidence: "High",
  /** 0–100 for signal meter */
  confidencePct: 92,
  basedOn: "14d",
};

export const readinessScore = {
  value: 84,
  label: "Readiness",
  sublabel: "Sleep · load · recovery",
  trend: "+6 WoW",
};

export const adaptiveDailyPlan = [
  {
    id: "d1",
    time: "8:00",
    title: "Deep work · roadmap narrative",
    duration: "90 min",
    priority: "high" as const,
    why: "Peak window",
  },
  {
    id: "d2",
    time: "11:30",
    title: "Inbox + async replies",
    duration: "45 min",
    priority: "medium" as const,
    why: "Post-peak",
  },
  {
    id: "d3",
    time: "4:30",
    title: "Light review + tomorrow’s top 3",
    duration: "25 min",
    priority: "low" as const,
    why: "Close loop",
  },
];

/** Home “This week” dashboard — four headline metrics only on This Week card */
export const weeklyDashboard = {
  weekLabel: "This week",
  focusHours: 18.4,
  /** Deep work sessions finished this week */
  sessionsCompleted: 11,
  /** Current rolling habit streak (days) */
  streakDays: 14,
  /** Composite weekly momentum score */
  weeklyScore: 84,
};

export const progressSummary = {
  weekLabel: weeklyDashboard.weekLabel,
  focusHours: weeklyDashboard.focusHours,
  goalsAdvanced: 4,
  habitsKept: 92,
  wins: 23,
};

export const dailyProgress = {
  percentage: 72,
  tasksCompleted: 13,
  tasksTotal: 18,
  label: "Daily momentum",
};

export const habitStreaks = [
  { id: "1", name: "Morning ritual", streak: 24, icon: "sun", color: "amber" as const },
  { id: "2", name: "Deep work", streak: 12, icon: "target", color: "emerald" as const },
  { id: "3", name: "Movement", streak: 9, icon: "pulse", color: "emerald" as const },
  { id: "4", name: "Evening review", streak: 31, icon: "moon", color: "amber" as const },
];

export const motivationalIntelligence = {
  quote: "Consistency beats intensity.",
  chips: ["4/5 deep days", "Walk +10m PM"] as const,
  streakHighlight: "31d review · top 6%",
};

export const nextBestActions = [
  { id: "nba1", title: "Schedule Q2 pilot call", impact: "Unblocks pilot", eta: "20m" },
  { id: "nba2", title: "Prep investor talking points", impact: "Faster sync", eta: "35m" },
  { id: "nba3", title: "Log sleep in Health", impact: "Readiness+", eta: "2m" },
];

export const communityProof = {
  headline: "Network pulse",
  membersActive: "240K+",
  challengesLive: 12,
  yourRank: "Top 8%",
  activityChip: "4.8K focus finishes · week",
};

export const priorities = [
  {
    id: "p1",
    title: "Ship Q2 roadmap review",
    due: "Today · 4:00 PM",
    tag: "Work",
    urgent: true,
  },
  {
    id: "p2",
    title: "Prep investor update deck",
    due: "Tomorrow",
    tag: "Work",
    urgent: false,
  },
  {
    id: "p3",
    title: "Book annual health check",
    due: "This week",
    tag: "Life",
    urgent: false,
  },
];

export const homeStats = [
  {
    id: "s1",
    label: "Today focus",
    value: 4.2,
    suffix: "h",
    decimals: 1,
    trend: "+0.6h",
    trendUp: true,
  },
  {
    id: "s2",
    label: "Momentum",
    value: 84,
    suffix: "",
    decimals: 0,
    trend: "+5",
    trendUp: true,
  },
  {
    id: "s3",
    label: "Habit score",
    value: 92,
    suffix: "%",
    decimals: 0,
    trend: "+3%",
    trendUp: true,
  },
];

export const goalCategories = ["All", "Career", "Health", "Growth", "Finance"] as const;

export const goals = [
  {
    id: "g1",
    title: "Close first enterprise pilot",
    category: "Career",
    progress: 68,
    /** Cohort average progress for bar compare */
    peerProgress: 54,
    target: "Jun 30",
    projectedCompletion: "Jul 12",
    accountabilityScore: 88,
    benchmarkVsPeers: "+14%",
    milestones: [
      { id: "m1", label: "ICP interviews completed", done: true },
      { id: "m2", label: "Pilot proposal sent", done: true },
      { id: "m3", label: "Legal & security review", done: false },
      { id: "m4", label: "Signed SOW", done: false },
    ],
    timeline: [
      { id: "t1", date: "Apr 2", label: "Discovery", done: true },
      { id: "t2", date: "Apr 18", label: "Proposal", done: true },
      { id: "t3", date: "May 9", label: "Security", done: false },
      { id: "t4", date: "Jun 20", label: "Pilot kickoff", done: false },
    ],
    trend: [42, 48, 52, 55, 61, 64, 68],
  },
  {
    id: "g2",
    title: "Run sub-45 10K",
    category: "Health",
    progress: 41,
    peerProgress: 34,
    target: "Aug 12",
    projectedCompletion: "Sep 3",
    accountabilityScore: 72,
    benchmarkVsPeers: "+6%",
    milestones: [
      { id: "m1", label: "Base mileage built", done: true },
      { id: "m2", label: "Tempo sessions weekly", done: false },
      { id: "m3", label: "Race week taper", done: false },
    ],
    timeline: [
      { id: "t1", date: "Mar 1", label: "Base", done: true },
      { id: "t2", date: "May 1", label: "Build", done: false },
      { id: "t3", date: "Jul 15", label: "Peak", done: false },
    ],
    trend: [12, 18, 22, 28, 31, 36, 41],
  },
  {
    id: "g3",
    title: "Read 24 books this year",
    category: "Growth",
    progress: 54,
    peerProgress: 40,
    readingMix: [
      { label: "Fiction", pct: 32 },
      { label: "Skills", pct: 41 },
      { label: "Leadership", pct: 27 },
    ] as const,
    target: "Dec 31",
    projectedCompletion: "On track",
    accountabilityScore: 81,
    benchmarkVsPeers: "+22%",
    milestones: [{ id: "m1", label: "13 / 24 complete", done: false }],
    timeline: [
      { id: "t1", date: "Q1", label: "6 books", done: true },
      { id: "t2", date: "Q2", label: "6 books", done: false },
    ],
    trend: [20, 28, 33, 38, 44, 49, 54],
  },
];

export const smartTimerPresets = [
  { label: "25", sec: 25 * 60, desc: "Pomodoro sprint", tag: "Popular" },
  { label: "45", sec: 45 * 60, desc: "Deep block", tag: "Focus" },
  { label: "60", sec: 60 * 60, desc: "Maker session", tag: "Pro" },
];

export const focusSessions = {
  todayMinutes: 142,
  weekSessions: 11,
  avgFocusLengthMin: 38,
  deepWorkScore: 81,
  interruptionsAvg: 2.1,
  longestStreakMin: 94,
};

/** Focus tab — three-card modules (goal · ambient · productivity) */
export const focusDashboard = {
  weeklyTargetHours: 18,
  weeklyLoggedHours: 11.4,
  /** Mon–Sun minutes logged */
  weekFocusMinutesDaily: [95, 102, 88, 120, 110, 78, 91],
  productivityScore: 81,
  productivityPrevWeek: 76,
  sessionQualityPct: 86,
  sessionQualityLabel: "High" as const,
  interruptionsWeek: 7,
  cohortAvgQualityPct: 72,
};

export const sessionHistory = [
  { id: "sh1", day: "Today", title: "Strategy memo", minutes: 52, quality: "High" },
  { id: "sh2", day: "Today", title: "Design critique", minutes: 45, quality: "High" },
  { id: "sh3", day: "Yesterday", title: "Investor deck", minutes: 61, quality: "Peak" },
  { id: "sh4", day: "Yesterday", title: "Email batch", minutes: 28, quality: "Medium" },
];

export const energyRecommendation = {
  headline: "Front-load hard work",
  chip: "HRV↑ · AM 60–90m",
};

export const interruptionInsight = {
  count: 7,
  period: "this week",
  topSource: "Slack",
  tip: "Focus status + 25m Slack batches.",
};

export const ambientSounds = [
  {
    id: "rain",
    label: "Rain",
    description: "Steady drizzle · binaural mix",
    mode: "Calm",
    icon: "cloud-rain" as const,
  },
  {
    id: "cafe",
    label: "Café hum",
    description: "Soft chatter · low-mid mask",
    mode: "Social",
    icon: "coffee" as const,
  },
  {
    id: "forest",
    label: "Forest",
    description: "Birdsong · spatial audio",
    mode: "Nature",
    icon: "trees" as const,
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Slow waves · sleep-safe",
    mode: "Restore",
    icon: "waves" as const,
  },
  {
    id: "white",
    label: "White noise",
    description: "Neutral mask · tinnitus-friendly",
    mode: "Focus",
    icon: "radio" as const,
  },
];

export const weeklyInsight = {
  focusMinutes: [120, 90, 145, 160, 110, 85, 142],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  consistencyScore: 86,
  weekOverWeek: "+12%",
  topInsight: "Protect AM deep blocks next week.",
};

/** 7 days × 5 weeks, 0–4 intensity */
export const focusHeatmap: number[][] = [
  [2, 3, 2, 4, 3, 1, 2],
  [3, 4, 3, 3, 4, 2, 3],
  [2, 2, 4, 4, 3, 3, 2],
  [3, 3, 3, 2, 4, 2, 3],
  [4, 3, 4, 3, 3, 2, 4],
];

export const monthlyGrowthReport = {
  month: "April 2026",
  headline: "Strong focus consistency",
  delta: "+18% vs Mar",
  highlights: ["4w · 3+ deep sessions", "Recovery 81 avg", "No burnout flags"] as const,
};

export const aiHabitSuggestions = [
  {
    id: "ai1",
    title: "10m mobility break",
    reason: "Afternoon crash · long sits",
    effort: "Easy",
  },
  {
    id: "ai2",
    title: "Meetings after 2 PM",
    reason: "Protects AM peak",
    effort: "Med",
  },
  {
    id: "ai3",
    title: "Sunday 20m preview",
    reason: "Fewer urgent mid-week",
    effort: "Easy",
  },
];

export const growthMetrics = [
  { id: "gm1", label: "Habit adherence", value: "91%", change: "+4%" },
  { id: "gm2", label: "Goal velocity", value: "High", change: "Stable" },
  { id: "gm3", label: "Recovery score", value: "78", change: "+6 pts" },
];

export const achievements = [
  {
    id: "a1",
    icon: "laser" as const,
    title: "Laser focus",
    desc: "10 sessions > 45m",
    unlocked: true,
  },
  {
    id: "a2",
    icon: "streak" as const,
    title: "Streak keeper",
    desc: "30-day habit",
    unlocked: true,
  },
  {
    id: "a3",
    icon: "north" as const,
    title: "North star",
    desc: "Complete a major milestone",
    unlocked: false,
  },
  {
    id: "a4",
    icon: "reflective" as const,
    title: "Reflective",
    desc: "4 weekly reviews",
    unlocked: true,
  },
];

export const connectedDevices = [
  { id: "dev1", name: "iPhone 16 Pro", last: "Active now", status: "ok" as const },
  { id: "dev2", name: "Apple Watch", last: "Synced 12m ago", status: "ok" as const },
  { id: "dev3", name: "MacBook · Arc", last: "Web app", status: "ok" as const },
];

export const privacyControls = [
  { id: "pv1", label: "Analytics & product improvement", hint: "Anonymous usage", on: true },
  { id: "pv2", label: "Personalized insights", hint: "On-device first", on: true },
  { id: "pv3", label: "Export my data", hint: "GDPR-ready JSON", on: false },
];

export const progressHistory = [
  { id: "ph1", label: "Apr week 3", score: 84, note: "Strong focus week" },
  { id: "ph2", label: "Apr week 2", score: 79, note: "Travel dip" },
  { id: "ph3", label: "Apr week 1", score: 82, note: "Baseline" },
];

export const settingsGroups = [
  {
    title: "Personalization",
    items: [
      { id: "notif", label: "Notifications", hint: "Smart reminders" },
      { id: "calendar", label: "Calendar sync", hint: "Google" },
      { id: "ai", label: "AI coaching tone", hint: "Direct" },
    ],
  },
  {
    title: "Privacy & data",
    items: [
      { id: "privacy", label: "Privacy center", hint: "Controls" },
      { id: "export", label: "Download data", hint: "" },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "help", label: "Help center", hint: "" },
      { id: "feedback", label: "Send feedback", hint: "" },
    ],
  },
];

/** Premium hero copy — aspirational, concise (display + sub in views) */
export const screenHero = {
  homeTitle: "Your performance snapshot, sharpened daily.",
  homeSubtitle: "Readiness · streaks · focus — in one glance.",
  focusTitle: "Deep work, calibrated.",
  focusSubtitle: "Timer · sound · score — one flow.",
  insightsTitle: "Signal over noise.",
  insightsSubtitle: "Trends · heatmaps · growth — fast.",
  goalsTitle: "Objectives that stay measurable.",
  goalsSubtitle: "Milestones · velocity · benchmarks.",
  profileTagline: "Identity · progress · control",
} as const;

export const onboardingSlides = [
  {
    title: "Build momentum that compounds",
    body: "Goals, deep work, and insights in a single premium flow — for people who move fast and think long-term.",
    icon: "spark" as const,
  },
  {
    title: "Your data becomes your edge",
    body: "Readiness, adaptive plans, and intelligent nudges — act with precision, not dashboard fatigue.",
    icon: "shield" as const,
  },
  {
    title: "Streaks that actually stick",
    body: "Connect calendar and health when you’re ready. Explore the full prototype on your terms.",
    icon: "flame" as const,
  },
];
