function badgeClass(value: string): string {
  const base = "capitalize px-2 py-1 rounded text-xs";

  const map: Record<string, string> = {
    OPEN: "bg-green-100 text-green-800",
    CLOSED: "bg-red-100 text-red-800",
    PENDING: "bg-yellow-100 text-yellow-800",

    LOW: "bg-blue-100 text-blue-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",

    RECONCILIATION_COMMITTEE: "bg-gray-100 text-gray-800",
    FIRST_INSTANCE_COURT: "bg-blue-100 text-blue-800",
    APPEAL_COURT: "bg-indigo-100 text-indigo-800",
    CASSATION_HIGH_COURT: "bg-purple-100 text-purple-800",
    EXECUTION: "bg-orange-100 text-orange-800",
    UNDER_SETTLEMENT: "bg-teal-100 text-teal-800",
    SETTLED_CLOSED: "bg-lime-100 text-lime-800",
    DISPUTE: "bg-rose-100 text-rose-800",

    CRIMINAL: "bg-red-50 text-red-700",
    CIVIL: "bg-gray-50 text-gray-700",
    COMMERCIAL: "bg-yellow-50 text-yellow-700",
    ADMINISTRATIVE: "bg-purple-50 text-purple-700",
    LABOR: "bg-teal-50 text-teal-700",
    FAMILY: "bg-pink-50 text-pink-700",
    REAL_ESTATE: "bg-green-50 text-green-700",
    INTELLECTUAL_PROPERTY: "bg-indigo-50 text-indigo-700",
    ENVIRONMENTAL: "bg-emerald-50 text-emerald-700",
    TAXATION: "bg-orange-50 text-orange-700",
  };

  return `${base} ${map[value] || "bg-muted text-muted-foreground"}`;
}

export default badgeClass;
