import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { useMemo, useState, useEffect } from "react";
import { Activity, ArrowLeft, ArrowRight, BadgeCheck, Ban, Check, ChevronRight, CircleAlert, Clock3, Database, FileCheck2, FileClock, FileSearch, Filter, Gauge, GitBranch, Layers3, MoreHorizontal, Network, Plus, Search, Server, ShieldCheck, Sparkles, TrendingUp, Upload, X , Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/status-pill";
import { auditEvents, mappings, metrics, queue, scenarios, type ScenarioKey } from "@/lib/demo-data";

type View = "command" | "intake" | "validation" | "governance" | "identity" | "signals" | "audit" | "health" | "policy";
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { view: View, scenario?: string } => ({
    view: (["command", "intake", "validation", "governance", "identity", "signals", "audit", "health", "policy"].includes(String(search['view'])) ? search['view'] : "command") as View,
    scenario: search['scenario'] as string | undefined
  }),
  head: () => ({ meta: [
    { title: "Command Center — MAITRI-MDM" },
    { name: "description", content: "Enterprise material identity governance command center for CPSE reconciliation." },
    { property: "og:title", content: "MAITRI-MDM Command Center" },
    { property: "og:description", content: "AI discovers candidates. Engineering proves compatibility. Human governance decides." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const { view } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const go = (next: View, overrideScenario?: string) => navigate({ search: (prev) => ({ view: next, scenario: overrideScenario || prev.scenario }) });
  if (view === "intake" || view === "validation" || view === "governance") return <Workflow view={view} go={go} />;
  if (view === "identity") return <IdentityPage />;
  if (view === "signals") return <SignalsPage />;
  if (view === "audit") return <AuditPage />;
  if (view === "health") return <HealthPage />;
    if (view === "policy") return <PolicyPage go={go} />;
  return <CommandCenter go={go} />;
}

function PageHead({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return <div className="page-head"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}

function CommandCenter({ go }: { go: (view: View) => void }) {
  return <div className="page animate-in">
    <PageHead eyebrow="National material identity network" title="Command Center" description="Operational control for governed material identities across participating CPSEs." actions={<><Button variant="secondary"><Upload size={16}/> Import records</Button><Button variant="secondary" onClick={() => go("policy")}><Settings2 size={16}/> Policy Simulator</Button><Button onClick={() => go("intake")}><Plus size={16}/> New material request</Button></>} />
    <section className="principle-strip"><div className="principle-icon"><GitBranch /></div><div><strong>Find → Prove → Govern</strong><span>AI discovers candidates. Engineering proves compatibility. Human governance decides.</span></div><p>Similarity is a candidate — not a decision.</p></section>
    <section className="metric-grid">{metrics.map((m, i) => { const MetricIcon = [Database, FileSearch, CircleAlert, BadgeCheck][i] ?? Database; return <article className="metric-card" key={m.label}><div className={`metric-icon tone-${m.tone}`}><MetricIcon size={19} /></div><span>{m.label}</span><strong>{m.value}</strong><small>{m.change}</small></article> })}</section>
    <div className="dashboard-grid">
      <section className="panel queue-panel"><div className="panel-head"><div><h2>Priority review queue</h2><p>Items requiring human attention</p></div><button className="text-action" onClick={() => go("governance")}>View all <ArrowRight size={14}/></button></div>
        <div className="table-wrap"><table><thead><tr><th>Request</th><th>Material</th><th>CPSE</th><th>Stage</th><th>Age</th><th>Status</th><th></th></tr></thead><tbody>{queue.map((q) => <tr key={q.id}><td className="mono">{q.id}</td><td><strong>{q.material}</strong></td><td>{q.cpse}</td><td>{q.stage}</td><td>{q.age}</td><td><StatusPill tone={q.risk === "Conflict" ? "red" : q.risk === "Review" ? "amber" : "green"}>{q.risk}</StatusPill></td><td><Button variant="ghost" size="icon" aria-label={`Open ${q.id}`} onClick={() => go("validation")}><ChevronRight size={16}/></Button></td></tr>)}</tbody></table></div>
      </section>
      <aside className="panel activity-panel"><div className="panel-head"><div><h2>Network activity</h2><p>Last 24 hours</p></div><Activity size={18}/></div><div className="stacked-stat"><div><span>ONGC</span><strong>38%</strong></div><i><b className="bar-38" /></i></div><div className="stacked-stat"><div><span>IOCL</span><strong>27%</strong></div><i><b className="bar-27" /></i></div><div className="stacked-stat"><div><span>BPCL</span><strong>21%</strong></div><i><b className="bar-21" /></i></div><div className="stacked-stat"><div><span>Other CPSEs</span><strong>14%</strong></div><i><b className="bar-14" /></i></div><div className="activity-total"><span>Processed today</span><strong>426</strong><small>Across 6 approved sources</small></div></aside>
    </div>
    <div className="dashboard-lower">
      <section className="panel"><div className="panel-head"><div><h2>Recent governed decisions</h2><p>Evidence-backed approvals and holds</p></div><Button variant="ghost" size="icon" aria-label="More options"><MoreHorizontal/></Button></div>{auditEvents.slice(0,3).map((e, i)=><div className="decision-row" key={e.time}><span className={`decision-dot ${i===2?"dot-blue":"dot-green"}`}>{i===2?<Search/>:<Check/>}</span><div><strong>{e.action}</strong><p>{e.material} · {e.user}</p></div><StatusPill tone={i===2?"blue":"green"}>{e.decision}</StatusPill><time>{e.time}</time></div>)}</section>
      <section className="panel"><div className="panel-head"><div><h2>Platform status</h2><p>Prototype connector health</p></div><StatusPill tone="green">All systems normal</StatusPill></div><div className="health-list"><div><span><Server/>Candidate index</span><strong><i/> Operational</strong></div><div><span><Layers3/>Engineering rules</span><strong><i/> Operational</strong></div><div><span><Database/>ERP connectors</span><strong className="status-warn"><i/> Mock mode</strong></div></div><Button variant="secondary" onClick={() => go("health")}>View resilience simulation <ArrowRight size={15}/></Button></section>
    </div>
  </div>;
}

function Workflow({ view, go }: { view: View; go: (view: View, overrideScenario?: string) => void }) {
    const { scenario: queryScenario } = Route.useSearch();
  const { role } = useStore();
  const [scenario, setScenario] = useState<ScenarioKey>((queryScenario as ScenarioKey) || "match");
    
    // Sync state if URL changes
    useEffect(() => {
      if (queryScenario && Object.keys(scenarios).includes(queryScenario)) {
        setScenario(queryScenario as ScenarioKey);
        setMaker(false);
        setChecker(false);
        setSearched(view !== "intake");
      }
    }, [queryScenario, view]);
  const [maker, setMaker] = useState(false);
  const [checker, setChecker] = useState(false);
  const [searched, setSearched] = useState(view !== "intake");
  const data = scenarios[scenario];
  const active = maker && checker && scenario === "match";
  const attributes = Object.keys(data.requested) as Array<keyof typeof data.requested>;
  const isMismatch = (key: keyof typeof data.requested) => data.requested[key] !== data.candidate[key];
  const selectScenario = (key: ScenarioKey) => { setScenario(key); go(view, key); };
  const phase = view === "intake" && !searched ? 1 : view === "governance" ? 3 : 2;
  return <div className="page animate-in">
    <PageHead eyebrow="Pre-create guardrail · MR-2026-1842" title={phase === 1 ? "New Material Request" : phase === 2 ? "Engineering Proof" : "Governance Decision"} description="Validate against the approved identity index before local ERP master creation." actions={<StatusPill tone="blue">Deterministic fallback active</StatusPill>} />
    <div className="stepper"><span className={phase>=1?"done":""}><b>1</b> Material intake</span><i/><span className={phase>=2?"done":""}><b>2</b> Find candidates</span><i/><span className={phase>=2?"done":""}><b>3</b> Engineering proof</span><i/><span className={phase>=3?"done":""}><b>4</b> Govern</span></div>
    <section className="scenario-bar"><div><Sparkles/><span><strong>Judge demo scenarios</strong><small>Load a verified test case</small></span></div><div className="scenario-buttons">{(Object.keys(scenarios) as ScenarioKey[]).map(k=><button key={k} className={scenario===k?"active":""} onClick={()=>selectScenario(k)}>{scenarios[k].label}</button>)}</div></section>
    
      {phase === 1 && <IntakeForm data={data} onSearch={()=>{setSearched(true); go("validation");}} />}
      {phase === 2 && <div className="proof-layout">
        <section className="panel proof-panel">
          <div className="candidate-summary"><div><span className="eyebrow">Top governed candidate</span><h2>{data.code}</h2><p>SS304 Seamless Pipe · Approved identity index</p></div><StatusPill tone={scenario==="match"?"indigo":scenario==="review"?"amber":"red"}>{data.status}</StatusPill></div>
          <div className="comparison-header"><span>Technical attribute</span><span>Requested material</span><span>Candidate identity</span><span>Result</span></div>
          {attributes.map(key => { const mismatch=isMismatch(key); const missing=data.requested[key]==="Not provided"; return <div className={`comparison-row ${mismatch?"row-alert":""}`} key={key}><span>{key === "uom" ? "UoM" : key.charAt(0).toUpperCase()+key.slice(1)}</span><strong>{data.requested[key]}</strong><strong>{data.candidate[key]}</strong><StatusPill tone={missing?"amber":mismatch?"red":"green"}>{missing?"Missing":mismatch?"Different":"Match"}</StatusPill></div>})}
        </section>
        <aside className={`verdict ${scenario==="match"?"verdict-good":scenario==="review"?"verdict-review":"verdict-bad"}`}><div className="verdict-icon">{scenario==="match"?<ShieldCheck/>:scenario==="review"?<CircleAlert/>:<Ban/>}</div><span className="eyebrow">Rules engine verdict</span><h2>{scenario==="match"?"Technically compatible candidate":scenario==="review"?"Review required":"No safe match"}</h2><p>{scenario==="match"?"All required engineering attributes are compatible. Human approval is still required.":scenario==="review"?"Schedule is required for a safe engineering decision. Send to an engineer for correction.":"Critical technical attribute conflict detected. High similarity cannot override engineering rules."}</p><div className="rule-note"><strong>{data.recommendation}</strong><span>Recommendation only · No automatic decision</span></div>{scenario==="match"?<Button onClick={() => { go("governance"); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }}>Continue to governance <ArrowRight size={16}/></Button>:scenario==="review"?<Button variant="secondary">Send to engineer</Button>:<Button variant="danger">Candidate blocked <X size={16}/></Button>}</aside>
      </div>}
      {phase === 3 && (
        <div className="governance-page" style={{ width: '100%' }}>
          <div style={{ marginBottom: "16px" }}><Button variant="secondary" onClick={() => go("validation")}><ArrowLeft size={16}/> Back to Validation</Button></div>
          <section className="governance-panel panel"><div className="panel-head"><div><h2>Maker–checker approval</h2><p>Identity activates only after both human decisions</p></div><StatusPill tone={active?"green":"amber"}>{active?"Identity active":"Approval in progress"}</StatusPill></div><div className="approval-flow"><article className={maker?"approved":""}><span>1</span><div><small>Engineer / Maker</small><strong>{maker?"Technical proof approved":"Awaiting technical approval"}</strong><p>R. Iyer · Senior Materials Engineer</p></div><Button variant={maker?"secondary":"primary"} disabled={role !== "Engineer"} onClick={()=>{if(role==="Engineer") setMaker(!maker)}}>{maker?<><Check/> Approved</>:(role !== "Engineer" ? "Only Engineer can approve" : "Approve technical proof")}</Button></article><ChevronRight/><article className={checker?"approved":""}><span>2</span><div><small>Checker</small><strong>{checker?"Governance approval complete":"Awaiting checker approval"}</strong><p>A. Mehta · National Material Steward</p></div><Button disabled={!maker || role !== "Approver"} variant={checker?"secondary":"primary"} onClick={()=>{if(role==="Approver") setChecker(!checker)}}>{checker?<><Check/> Approved</>:(role !== "Approver" ? "Only Approver can approve" : "Approve mapping")}</Button></article></div>{active&&<div className="activation-banner"><BadgeCheck/><div><strong>IN-MAT-000184 activated</strong><span>Passport, local mapping, and audit timeline updated.</span></div><Button onClick={()=>go("identity")}>Open identity passport <ArrowRight/></Button></div>}</section>
        </div>
      )}

  </div>;
}

function IntakeForm({ data, onSearch }: { data: any; onSearch:()=>void }) {
  return <div className="intake-layout"><section className="panel form-panel"><div className="panel-head"><div><h2>Material specification</h2><p>Required attributes are checked before candidate retrieval</p></div><StatusPill tone="neutral">Draft</StatusPill></div><div className="form-grid"><label><span>CPSE</span><select value={data.cpse} readOnly><option>ONGC</option><option>IOCL</option><option>BPCL</option><option>GAIL</option></select></label><label><span>Local request reference</span><input value={data.ref || "NMR-ONGC-2026-0418"} readOnly/></label><label className="wide"><span>Material description</span><input value={data.desc || "SS304 Seamless Pipe, 2 inch, SCH 40, ASTM A312"} readOnly/></label>{Object.entries(data.requested).map(([k,v])=><label key={k}><span>{k==="uom"?"UoM":k.charAt(0).toUpperCase()+k.slice(1)}</span><input value={String(v)} readOnly /></label>)}</div><div className="form-actions"><span><ShieldCheck/> Checked against approved local snapshot</span><Button onClick={onSearch}><Search size={16}/> Check existing identity</Button></div></section><aside className="panel intake-aside"><div className="aside-icon"><ShieldCheck/></div><span className="eyebrow">Pre-create guardrail</span><h2>Protect the future</h2><p>Every new material request is checked before a new local master is created.</p><ul><li><Check/> Local ERP code remains unchanged</li><li><Check/> Critical attributes override similarity</li><li><Check/> Human approval remains mandatory</li></ul></aside></div>;
}

function IdentityPage() { 
  const [drift, setDrift] = useState(false);
  return <div className="page animate-in">
    <PageHead eyebrow="Governed material master" title="Material Identity Passport" description="A traceable national cross-reference with local ERP ownership preserved." actions={<><Button variant="secondary"><FileCheck2/> Export evidence</Button><Button onClick={() => setDrift(true)} disabled={drift} style={{ backgroundColor: drift ? '#f3f4f6' : '#f59e0b', color: drift ? '#9ca3af' : '#fff' }}><ShieldCheck size={16}/> Simulate Source Change</Button></>} />
    <section className="passport">
      <div className="passport-band">
        <div className="identity-seal"><ShieldCheck/></div>
        <div><span className="eyebrow">National material identity</span><h2>IN-MAT-000184</h2><p>SS304 Seamless Pipe</p></div>
        <StatusPill tone={drift ? "amber" : "green"}>{drift ? "Identity at Risk" : "Active \u2022 v3.2"}</StatusPill>
      </div>
      <div className="passport-spec">
        <div><span>Canonical specification</span><strong>2 inch \u2022 SCH 40 \u2022 ASTM A312</strong></div>
        <div><span>Category</span><strong>PIPE</strong></div>
        <div><span>Unit of measure</span><strong>EA</strong></div>
        <div><span>Criticality</span><strong>Medium</strong></div>
        <div><span>Technical basis</span><strong>Verified</strong></div>
        <div><span>Governance</span><strong>Maker + Checker approved</strong></div>
      </div>
      <div className="ownership-note">
        <Network/>
        <div><strong>National identity is a governed cross-reference.</strong><span>Local ERP codes remain unchanged.</span></div>
      </div>
    </section>
    
    {drift && (
      <section className="panel" style={{ border: '1px solid #f59e0b', backgroundColor: '#fffbeb', marginBottom: '24px' }}>
        <div className="panel-head" style={{ borderBottom: '1px solid #fcd34d' }}>
          <div>
            <h2 style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '8px' }}><CircleAlert size={18}/> IDENTITY AT RISK</h2>
            <p style={{ color: '#b45309' }}>Existing mapping requires revalidation due to source data change</p>
          </div>
          <StatusPill tone="amber">REVALIDATION CASE #RV-1045</StatusPill>
        </div>
        <div style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '8px', fontSize: '13px' }}>
              <strong>ONGC A-1045</strong> changed <code>SCH40 &rarr; SCH80</code>
            </div>
            <span style={{ fontSize: '13px', color: '#92400e' }}>System does not automatically delete or change the governed identity. It flags it for engineering review.</span>
          </div>
          <Button variant="primary" style={{ backgroundColor: '#b45309' }}>Review Change</Button>
        </div>
      </section>
    )}
    
    <section className="panel mappings-panel">
      <div className="panel-head">
        <div><h2>Local ERP mappings</h2><p>Approved source references linked to this identity</p></div>
        <StatusPill tone={drift ? "amber" : "blue"}>{drift ? "1 mapping requires revalidation" : "3 verified references"}</StatusPill>
      </div>
      <div className="mapping-grid">
        {mappings.map(m => {
          const isDrift = drift && m.cpse === "ONGC";
          return (
          <article key={m.cpse} style={{ border: isDrift ? '1px dashed #f59e0b' : undefined, backgroundColor: isDrift ? '#fffdf4' : undefined }}>
            <div className="cpse-mark" style={{ backgroundColor: isDrift ? '#fde68a' : undefined }}>{m.cpse.slice(0,2)}</div>
            <div>
              <span>{m.cpse}</span>
              <strong>{m.code}</strong>
              {isDrift ? (
                <p style={{ color: '#b45309' }}><strike style={{ opacity: 0.5 }}>{m.description}</strike><br/><b>SS304 Seamless Pipe, 2 inch, SCH 80, ASTM A312</b></p>
              ) : (
                <p>{m.description}</p>
              )}
            </div>
            <StatusPill tone={isDrift ? "amber" : "green"}>{isDrift ? "Revalidation Required" : m.status}</StatusPill>
          </article>
        )})}
      </div>
    </section>
    <Lineage />
  </div> 
}
function Lineage() { const events=["Source record","Normalized","Candidate retrieved","Technical proof","Maker approved","Checker approved","Identity active"]; return <section className="panel lineage"><div className="panel-head"><div><h2>Evidence lineage</h2><p>Reconstructable decision path · 29 Sep 2026</p></div><Button variant="secondary">View evidence pack</Button></div><div className="lineage-flow">{events.map((e,i)=><div key={e}><span className={i===events.length-1?"current":""}>{i===events.length-1?<BadgeCheck/>:<Check/>}</span><strong>{e}</strong><small>{`14:${16+i*3}`}</small></div>)}</div></section> }

function SignalsPage() { return <div className="page animate-in"><PageHead eyebrow="Decision support" title="Demand & Stock Signals" description="Identity-linked operational signals for informed CPSE decisions." actions={<Button variant="secondary"><Filter/> Filter network</Button>} /><div className="signal-banner"><TrendingUp/><div><strong>Opportunity signal — not an automatic PO</strong><span>Procurement authority remains with the respective CPSE.</span></div></div><section className="panel opportunity"><div className="panel-head"><div><h2>IN-MAT-000184 · Network demand</h2><p>SS304 Seamless Pipe · 2 inch · SCH 40</p></div><div className="big-total"><span>Combined signal</span><strong>640 EA</strong></div></div><div className="demand-grid"><article><span>ONGC</span><strong>340 <small>EA</small></strong><i><b className="demand-53"/></i><p>Required within 90 days</p></article><article><span>IOCL</span><strong>120 <small>EA</small></strong><i><b className="demand-19"/></i><p>Planning signal</p></article><article><span>BPCL</span><strong>180 <small>EA</small></strong><i><b className="demand-28"/></i><p>Approved forecast</p></article></div></section><section className="panel"><div className="panel-head"><div><h2>Relevant local holdings</h2><p>Potential holding signals requiring CPSE eligibility checks</p></div><StatusPill tone="amber">Review required</StatusPill></div><div className="eligibility-grid">{["Policy","Quantity","Quality","Safety","Shelf life"].map((x,i)=><div key={x}><span className={i<3?"check-good":"check-review"}>{i<3?<Check/>:<Clock3/>}</span><strong>{x}</strong><small>{i<3?"Eligible":"CPSE review"}</small></div>)}</div></section></div> }

function AuditPage() { return <div className="page animate-in"><PageHead eyebrow="Evidence and control" title="Audit & Lineage" description="Immutable-style prototype history for every material decision." actions={<><Button variant="secondary"><Filter/> Filter</Button><Button><FileCheck2/> Export log</Button></>} /><section className="panel audit-panel"><div className="panel-head"><div><h2>Decision event stream</h2><p>Showing synthetic events for IN-MAT-000184</p></div><StatusPill tone="blue">Evidence complete</StatusPill></div><div className="table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Role</th><th>Action</th><th>Material</th><th>Decision</th></tr></thead><tbody>{auditEvents.map(e=><tr key={e.time}><td className="mono">{e.time}</td><td><strong>{e.user}</strong></td><td>{e.role}</td><td>{e.action}</td><td className="mono">{e.material}</td><td><StatusPill tone={e.decision==="Approved"||e.decision==="Verified"?"green":"blue"}>{e.decision}</StatusPill></td></tr>)}</tbody></table></div></section><Lineage /></div> }

function HealthPage() { const [mode,setMode]=useState<"normal"|"degraded"|"restored">("normal"); const steps=mode==="normal"?["Search","Approved local index","Validation","Ranking","Continue"]:mode==="degraded"?["Approved snapshot","Freshness check","Validation","Review queue"]:["Connectivity restored","Reconcile","Govern","Resume sync"]; return <div className="page animate-in"><PageHead eyebrow="Prototype resilience simulation" title="System Health" description="Demonstrates governed fallback behavior when search services are unavailable." actions={<StatusPill tone={mode==="degraded"?"amber":"green"}>{mode==="normal"?"All systems normal":mode==="degraded"?"Degraded mode":"Connectivity restored"}</StatusPill>} /><section className="health-hero panel"><div className="mode-tabs"><button className={mode==="normal"?"active":""} onClick={()=>setMode("normal")}>Normal</button><button className={mode==="degraded"?"active":""} onClick={()=>setMode("degraded")}>Degraded</button><button className={mode==="restored"?"active":""} onClick={()=>setMode("restored")}>Restored</button></div><div className="system-flow">{steps.map((s,i)=><div key={s}><span>{i+1}</span><strong>{s}</strong>{i<steps.length-1&&<ArrowRight/>}</div>)}</div><div className={`system-explanation ${mode}`}><Gauge/><div><strong>{mode==="normal"?"Approved services available":mode==="degraded"?"Safe local fallback engaged":"Durable queue reconciliation"}</strong><span>{mode==="normal"?"Candidate retrieval uses semantic and structured search.":mode==="degraded"?"A freshness-checked snapshot supports validation; uncertain cases are held.":"Queued decisions are reconciled before normal operation resumes."}</span></div></div></section><div className="system-grid">{["Candidate index","Approved snapshot","Engineering rules","Audit event store"].map((x,i)=><article className="panel" key={x}><span className="system-icon">{i===0?<Search/>:i===1?<Database/>:i===2?<ShieldCheck/>:<FileClock/>}</span><div><strong>{x}</strong><p>{mode==="degraded"&&i===0?"Unavailable — fallback active":"Operational"}</p></div><StatusPill tone={mode==="degraded"&&i===0?"red":"green"}>{mode==="degraded"&&i===0?"Offline":"Healthy"}</StatusPill></article>)}</div><p className="prototype-note"><CircleAlert/> This is a prototype simulation, not a production disaster-recovery claim.</p></div> }


function PolicyPage({ go }: { go: (v: View) => void }) {
  const [simulated, setSimulated] = useState(false);
  return (
    <div className="page animate-in">
      <PageHead 
        eyebrow="Governance controls" 
        title="Policy Impact Simulator" 
        description="Simulate rule changes before deploying to production." 
        actions={<Button variant="secondary" onClick={() => go("command")}><ArrowLeft size={16}/> Back to Command Center</Button>} 
      />
      <div className="proof-layout">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Policy Sandbox</h2>
              <p>Test rule modifications on synthetic material master data</p>
            </div>
            <StatusPill tone="blue">Draft mode</StatusPill>
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span className="eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Current Rule</span>
                <strong style={{ display: 'block', marginBottom: '12px' }}>Attribute: Schedule</strong>
                <StatusPill tone="red">🔴 Critical Match</StatusPill>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>A mismatch immediately blocks the candidate mapping.</p>
              </div>
              <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px dashed #bfdbfe' }}>
                <span className="eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Proposed Rule</span>
                <strong style={{ display: 'block', marginBottom: '12px' }}>Attribute: Schedule</strong>
                <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #93c5fd', background: 'white', fontSize: '12px', fontWeight: 600, color: '#b45309' }}>
                  <option>🟡 Review-required</option>
                  <option>🔴 Critical Match</option>
                  <option>🟢 Informational</option>
                </select>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>A mismatch allows mapping but requires engineer review.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => setSimulated(true)} disabled={simulated} variant="primary"><Sparkles size={16}/> {simulated ? "Simulation Complete" : "SIMULATE IMPACT"}</Button>
            </div>

            {simulated && (
              <div className="animate-in" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Simulation Results</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Current Policy</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>MATCH</span>
                      <strong style={{ color: '#0f172a' }}>1,284</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>REVIEW</span>
                      <strong style={{ color: '#0f172a' }}>126</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>NO SAFE MATCH</span>
                      <strong style={{ color: '#0f172a' }}>42</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px', display: 'block' }}>After Proposed Policy</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>MATCH</span>
                      <strong style={{ color: '#0f172a' }}>1,170 <span style={{ color: '#ef4444', fontSize: '11px', marginLeft: '4px' }}>(-114)</span></strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', background: '#fffbeb' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>REVIEW</span>
                      <strong style={{ color: '#0f172a' }}>240 <span style={{ color: '#22c55e', fontSize: '11px', marginLeft: '4px' }}>(+114)</span></strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>NO SAFE MATCH</span>
                      <strong style={{ color: '#0f172a' }}>42 <span style={{ color: '#64748b', fontSize: '11px', marginLeft: '4px' }}>(-)</span></strong>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '24px' }}>
                  <strong style={{ color: '#166534', display: 'block', marginBottom: '4px' }}>114 existing mappings would require review</strong>
                  <p style={{ fontSize: '13px', color: '#15803d', margin: 0 }}>These mappings were previously automatic matches, but will be flagged for engineer review under the new rule.</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button variant="secondary" onClick={() => setSimulated(false)}>Cancel Policy Change</Button>
                  <Button variant="primary">Submit for Governance Review</Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {simulated && (
          <aside className="verdict verdict-review animate-in">
             <div className="verdict-icon"><ShieldCheck/></div>
             <span className="eyebrow">Impact Analysis</span>
             <h2>Affected Identities</h2>
             <p>The following identities would be flagged for revalidation if this policy is enacted:</p>
             <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <li style={{ padding: '8px 12px', background: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px', fontFamily: 'monospace', color: '#334155' }}>IN-MAT-000184 &mdash; SS304 Seamless Pipe</li>
               <li style={{ padding: '8px 12px', background: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px', fontFamily: 'monospace', color: '#334155' }}>IN-MAT-000219 &mdash; Carbon Steel Flange</li>
               <li style={{ padding: '8px 12px', background: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px', fontFamily: 'monospace', color: '#334155' }}>IN-MAT-000301 &mdash; Gate Valve 4"</li>
               <li style={{ padding: '4px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>+ 111 more</li>
             </ul>
             <div className="rule-note">
               <strong>No production changes yet</strong>
               <span>Policy updates require Checker approval</span>
             </div>
          </aside>
        )}
      </div>
    </div>
  );
}
