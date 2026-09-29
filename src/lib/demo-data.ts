export type ScenarioKey = "match" | "conflict" | "review" | "new";

export const scenarios = {
  match: {
    label: "Successful match",
    code: "IN-MAT-000184",
    requested: { grade: "SS304", size: "2 inch", schedule: "SCH 40", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    candidate: { grade: "SS304", size: "2 inch", schedule: "SCH 40", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    status: "Candidate — validation required",
    recommendation: "MAP",
  },
  conflict: {
    label: "Critical conflict",
    code: "IN-MAT-000261",
    requested: { grade: "SS304", size: "2 inch", schedule: "SCH 40", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    candidate: { grade: "SS304", size: "2 inch", schedule: "SCH 80", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    status: "Critical technical conflict",
    recommendation: "DO NOT MAP",
  },
  review: {
    label: "Review required",
    code: "IN-MAT-000184",
    requested: { grade: "SS304", size: "2 inch", schedule: "Not provided", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    candidate: { grade: "SS304", size: "2 inch", schedule: "SCH 40", standard: "ASTM A312", uom: "EA", category: "PIPE" },
    status: "Required attribute missing",
    recommendation: "REVIEW",
  },
  new: {
    label: "No suitable candidate",
    code: "No governed identity",
    requested: { grade: "Inconel 625", size: "6 inch", schedule: "SCH 160", standard: "ASTM B444", uom: "M", category: "PIPE" },
    candidate: { grade: "SS316", size: "6 inch", schedule: "SCH 80", standard: "ASTM A312", uom: "M", category: "PIPE" },
    status: "No safe match",
    recommendation: "CREATE",
  },
} as const;

export const metrics = [
  { label: "Materials processed", value: "18,642", change: "+8.4%", tone: "blue" },
  { label: "Candidate matches", value: "12,908", change: "69.2%", tone: "indigo" },
  { label: "Review required", value: "284", change: "42 urgent", tone: "amber" },
  { label: "Governed identities", value: "8,416", change: "+126 this month", tone: "green" },
];

export const queue = [
  { id: "MR-2026-1842", material: "SS304 Seamless Pipe, 2 inch", cpse: "ONGC", stage: "Checker review", age: "18 min", risk: "Ready" },
  { id: "MR-2026-1839", material: "Gate Valve, 150 NB, Class 300", cpse: "IOCL", stage: "Engineering proof", age: "43 min", risk: "Conflict" },
  { id: "MR-2026-1834", material: "Bearing 6312 C3", cpse: "BPCL", stage: "Attribute correction", age: "1 h 12 m", risk: "Review" },
  { id: "MR-2026-1827", material: "XLPE Cable, 3C × 95 sq mm", cpse: "GAIL", stage: "Candidate review", age: "2 h 06 m", risk: "Ready" },
];

export const mappings = [
  { cpse: "ONGC", code: "A-1045", description: "Pipe, SS304, 2 inch, Sch 40", status: "Verified" },
  { cpse: "IOCL", code: "P-7781", description: '2" Pipe Stainless 304 S40', status: "Verified" },
  { cpse: "BPCL", code: "X-9921", description: "SS-304 SMLS Pipe 50NB 40S", status: "Verified" },
];

export const auditEvents = [
  { time: "14:32:18", user: "A. Mehta", role: "Checker", action: "Mapping approved", material: "IN-MAT-000184", decision: "Approved" },
  { time: "14:28:02", user: "R. Iyer", role: "Engineer", action: "Technical proof signed", material: "IN-MAT-000184", decision: "Verified" },
  { time: "14:21:44", user: "System", role: "Rules engine", action: "Candidate retrieved", material: "MR-2026-1842", decision: "3 candidates" },
  { time: "14:16:11", user: "S. Verma", role: "Requester", action: "Material submitted", material: "MR-2026-1842", decision: "Accepted" },
];