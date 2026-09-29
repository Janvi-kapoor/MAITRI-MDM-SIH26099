import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auditEvents as initialAudit, mappings as initialMappings, queue as initialQueue } from "./demo-data";

export type Role = "Requester" | "Engineer" | "Approver";
export type RequestStage = "Draft" | "Candidate review" | "Engineering proof" | "Checker review" | "Active" | "Rejected";
export type RiskLevel = "Ready" | "Review" | "Conflict";

export interface MaterialRequest {
  id: string;
  description: string;
  attributes: {
    grade: string;
    size: string;
    schedule: string;
    standard: string;
    uom: string;
    category: string;
  };
  cpse: string;
  stage: RequestStage;
  age: string;
  risk: RiskLevel;
  candidateCode?: string;
  candidateAttributes?: any;
  recommendation?: "MAP" | "CREATE" | "REVIEW" | "DO NOT MAP";
  makerApproved?: boolean;
  checkerApproved?: boolean;
}

interface StoreState {
  role: Role;
  setRole: (r: Role) => void;
  queue: MaterialRequest[];
  addRequest: (req: MaterialRequest) => void;
  updateRequest: (id: string, updates: Partial<MaterialRequest>) => void;
  mappings: typeof initialMappings;
  addMapping: (mapping: any) => void;
  auditEvents: typeof initialAudit;
  addAuditEvent: (event: any) => void;
  aiAvailable: boolean;
  setAiAvailable: (v: boolean) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

// Local synthetic index
export const syntheticIndex = [
  { code: "IN-MAT-000184", attributes: { grade: "SS304", size: "2 inch", schedule: "SCH 40", standard: "ASTM A312", uom: "EA", category: "PIPE" } },
  { code: "IN-MAT-000261", attributes: { grade: "SS304", size: "2 inch", schedule: "SCH 80", standard: "ASTM A312", uom: "EA", category: "PIPE" } }
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Requester");
  const [aiAvailable, setAiAvailable] = useState(true);
  
  // Use localStorage to simulate persistence as requested by user
  const [queue, setQueue] = useState<MaterialRequest[]>(() => {
    try {
      const saved = localStorage.getItem("maitri_queue");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialQueue.map(q => ({
      ...q,
      description: q.material,
      attributes: { grade: "", size: "", schedule: "", standard: "", uom: "", category: "" }
    }));
  });
  
  const [mappings, setMappings] = useState(() => {
    try {
      const saved = localStorage.getItem("maitri_mappings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialMappings;
  });
  
  const [auditEvents, setAuditEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("maitri_audit");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAudit;
  });

  useEffect(() => {
    localStorage.setItem("maitri_queue", JSON.stringify(queue));
    localStorage.setItem("maitri_mappings", JSON.stringify(mappings));
    localStorage.setItem("maitri_audit", JSON.stringify(auditEvents));
  }, [queue, mappings, auditEvents]);

  const addRequest = (req: MaterialRequest) => setQueue(prev => [req, ...prev]);
  const updateRequest = (id: string, updates: Partial<MaterialRequest>) => 
    setQueue(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  const addMapping = (m: any) => setMappings(prev => [m, ...prev]);
  const addAuditEvent = (e: any) => setAuditEvents(prev => [{ ...e, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) }, ...prev]);

  return (
    <StoreContext.Provider value={{
      role, setRole, queue, addRequest, updateRequest,
      mappings, addMapping, auditEvents, addAuditEvent,
      aiAvailable, setAiAvailable
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
