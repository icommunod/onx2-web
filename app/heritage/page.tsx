"use client";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section =
  | "dashboard"
  | "confiance"
  | "immobilier"
  | "vehicules"
  | "investissements"
  | "entreprises"
  | "bijoux"
  | "assurances"
  | "digital"
  | "volontes"
  | "obseques";

// ─── Static data ─────────────────────────────────────────────────────────────

const REMINDERS = [
  { id: 1, level: "urgent", text: "Désigner un 2ᵉ bénéficiaire pour l'assurance-vie AXA", due: "À faire" },
  { id: 2, level: "warn", text: "Renouvellement assurance habitation dans 18 jours", due: "09 juin 2026" },
  { id: 3, level: "info", text: "Mettre à jour les accès Société Générale (mot de passe expiré)", due: "Bientôt" },
  { id: 4, level: "info", text: "Vérifier la clause bénéficiaire du contrat Boursorama", due: "Ce mois-ci" },
];

const TRUSTED = [
  { name: "Sophie Mercier", role: "Conjoint(e)", avatar: "SM", access: "Accès complet", color: "#4F7FE8" },
  { name: "Pierre Durand", role: "Notaire", avatar: "PD", access: "Lecture seule", color: "#2ECC71" },
  { name: "Camille Martin", role: "Enfant", avatar: "CM", access: "Accès partiel", color: "#F39C12" },
];

const ASSETS_OVERVIEW = [
  { label: "Immobilier", icon: "🏠", count: 2, value: "480 000 €", color: "#4F7FE8", section: "immobilier" as Section },
  { label: "Véhicules", icon: "🚗", count: 3, value: "62 000 €", color: "#2ECC71", section: "vehicules" as Section },
  { label: "Investissements", icon: "📈", count: 5, value: "187 000 €", color: "#9B59B6", section: "investissements" as Section },
  { label: "Entreprises", icon: "🏢", count: 1, value: "—", color: "#E67E22", section: "entreprises" as Section },
  { label: "Bijoux & Art", icon: "💎", count: 8, value: "34 000 €", color: "#E74C3C", section: "bijoux" as Section },
  { label: "Assurances", icon: "🛡️", count: 4, value: "—", color: "#1ABC9C", section: "assurances" as Section },
];

const COMPLETION_STEPS = [
  { label: "Informations personnelles", done: true },
  { label: "Personne(s) de confiance", done: true },
  { label: "Biens immobiliers", done: true },
  { label: "Comptes & investissements", done: true },
  { label: "Véhicules", done: true },
  { label: "Assurances", done: false },
  { label: "Vie digitale & accès", done: false },
  { label: "Dernières volontés", done: false },
  { label: "Obsèques", done: false },
];

const IMMOBILIER_ITEMS = [
  {
    title: "Appartement principal",
    address: "14 rue des Lilas, 75011 Paris",
    type: "Résidence principale",
    value: "380 000 €",
    area: "82 m²",
    notaire: "Maître Durand",
    tags: ["Titre de propriété", "Taxe foncière", "Diagnostics"],
    status: "Complet",
  },
  {
    title: "Studio locatif",
    address: "3 allée des Pins, 06000 Nice",
    type: "Investissement locatif",
    value: "100 000 €",
    area: "28 m²",
    notaire: "Maître Fabre",
    tags: ["Titre de propriété", "Bail en cours"],
    status: "À compléter",
  },
];

const VEHICULE_ITEMS = [
  { title: "Peugeot 3008", year: "2022", immat: "AB-123-CD", value: "28 000 €", assurance: "MAIF", status: "Complet" },
  { title: "BMW R 1250 GS", year: "2020", immat: "EF-456-GH", value: "18 000 €", assurance: "AXA Moto", status: "Complet" },
  { title: "Vélo électrique Riese & Müller", year: "2023", immat: "—", value: "4 500 €", assurance: "Non renseignée", status: "À compléter" },
];

const INVEST_ITEMS = [
  { label: "Assurance-vie Predica", type: "Assurance-vie", val: "62 000 €", benef: "Sophie Mercier", platform: "Crédit Agricole" },
  { label: "CTO Boursorama", type: "Compte-titres", val: "38 000 €", benef: "Non défini", platform: "Boursorama" },
  { label: "PEA BNP", type: "Plan d'Épargne en Actions", val: "45 000 €", benef: "Sophie Mercier", platform: "BNP Paribas" },
  { label: "SCPI Corum Origin", type: "SCPI", val: "22 000 €", benef: "—", platform: "Corum AM" },
  { label: "Crypto (Ledger)", type: "Cryptomonnaies", val: "20 000 €", benef: "Non défini", platform: "Self-custody" },
];

const DIGITAL_ITEMS = [
  { service: "Gmail", type: "Email", user: "ivan.m@gmail.com", access: "Enregistré", action: "Fermer le compte" },
  { service: "LinkedIn", type: "Réseau professionnel", user: "ivan-mercier", access: "Enregistré", action: "Mémorialiser" },
  { service: "iCloud", type: "Stockage / Photos", user: "ivan.m@icloud.com", access: "À compléter", action: "Transmettre" },
  { service: "Dropbox", type: "Stockage", user: "ivan.mercier@…", access: "À compléter", action: "Supprimer" },
  { service: "Netflix", type: "Streaming", user: "—", access: "Non renseigné", action: "Résilier" },
];

const INSURANCE_ITEMS = [
  { name: "Assurance-vie AXA", num: "AV-2019-4421", prime: "1 200 €/an", benef: "Sophie Mercier (50%) — À compléter", expire: "Permanent", alert: true },
  { name: "Habitation MAIF", num: "HAB-7712", prime: "580 €/an", benef: "—", expire: "09 juin 2026", alert: true },
  { name: "Auto MAIF", num: "AUTO-3392", prime: "920 €/an", benef: "—", expire: "01 jan 2027", alert: false },
  { name: "Prévoyance AG2R", num: "PREV-0011", prime: "320 €/an", benef: "Sophie Mercier", expire: "Lié emploi", alert: false },
];

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV: { section: Section; label: string; icon: string; badge?: number }[] = [
  { section: "dashboard", label: "Tableau de bord", icon: "⊞" },
  { section: "confiance", label: "Personnes de confiance", icon: "👥", badge: 3 },
  { section: "immobilier", label: "Immobilier", icon: "🏠", badge: 2 },
  { section: "vehicules", label: "Véhicules", icon: "🚗", badge: 3 },
  { section: "investissements", label: "Investissements", icon: "📈", badge: 5 },
  { section: "entreprises", label: "Entreprises", icon: "🏢", badge: 1 },
  { section: "bijoux", label: "Bijoux & Art", icon: "💎", badge: 8 },
  { section: "assurances", label: "Assurances", icon: "🛡️", badge: 4 },
  { section: "digital", label: "Vie digitale", icon: "🔐", badge: 5 },
  { section: "volontes", label: "Dernières volontés", icon: "📜" },
  { section: "obseques", label: "Obsèques", icon: "🕊️" },
];

// ─── Small components ─────────────────────────────────────────────────────────

function Badge({ n }: { n: number }) {
  return (
    <span style={{ background: "#4F7FE8", color: "#fff", borderRadius: 9, fontSize: 11, padding: "1px 7px", marginLeft: 6, fontWeight: 700 }}>
      {n}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const ok = status === "Complet";
  return (
    <span style={{
      background: ok ? "#d4f7e7" : "#fff3cd",
      color: ok ? "#1a7a4a" : "#856404",
      borderRadius: 12,
      fontSize: 12,
      padding: "2px 10px",
      fontWeight: 600,
    }}>
      {status}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 14,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A2332", margin: "0 0 20px" }}>
      {children}
    </h2>
  );
}

function AddBtn({ label }: { label: string }) {
  return (
    <button style={{
      background: "#4F7FE8",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "9px 18px",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}>
      + {label}
    </button>
  );
}

// ─── Section views ────────────────────────────────────────────────────────────

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  const done = COMPLETION_STEPS.filter((s) => s.done).length;
  const pct = Math.round((done / COMPLETION_STEPS.length) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Completion score */}
        <Card style={{ gridColumn: "1 / 2" }}>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 8px" }}>Complétion du dossier</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: 72, height: 72, transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={pct >= 80 ? "#2ECC71" : pct >= 50 ? "#F39C12" : "#E74C3C"}
                  strokeWidth="3"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round"
                />
              </svg>
              <span style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#1A2332",
              }}>
                {pct}%
              </span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px", color: "#1A2332" }}>{done}/{COMPLETION_STEPS.length} étapes</p>
              <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
                {COMPLETION_STEPS.filter((s) => !s.done).length} section(s) restante(s)
              </p>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            {COMPLETION_STEPS.map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ color: s.done ? "#2ECC71" : "#d1d5db", fontSize: 16 }}>{s.done ? "✓" : "○"}</span>
                <span style={{ color: s.done ? "#374151" : "#9ca3af" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Reminders */}
        <Card style={{ gridColumn: "2 / 4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#1A2332", margin: 0 }}>Rappels & alertes</p>
            <span style={{ fontSize: 12, color: "#6b7280" }}>4 en attente</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REMINDERS.map((r) => (
              <div key={r.id} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: r.level === "urgent" ? "#fef2f2" : r.level === "warn" ? "#fffbeb" : "#f0f9ff",
                borderLeft: `3px solid ${r.level === "urgent" ? "#ef4444" : r.level === "warn" ? "#f59e0b" : "#60a5fa"}`,
              }}>
                <span style={{ fontSize: 18, marginTop: 1 }}>
                  {r.level === "urgent" ? "🔴" : r.level === "warn" ? "🟡" : "🔵"}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#1A2332" }}>{r.text}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{r.due}</p>
                </div>
                <button style={{ background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer", color: "#374151" }}>
                  Traiter
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Assets grid */}
      <div>
        <p style={{ fontWeight: 700, fontSize: 16, color: "#1A2332", margin: "0 0 14px" }}>Mes biens & patrimoine</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {ASSETS_OVERVIEW.map((a) => (
            <button
              key={a.label}
              onClick={() => setSection(a.section)}
              style={{
                background: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "16px 20px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                transition: "box-shadow .15s",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: a.color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                {a.icon}
              </div>
              <div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 15, color: "#1A2332" }}>{a.label}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
                  {a.count} bien{a.count > 1 ? "s" : ""} · {a.value}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trusted persons quick view */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: "#1A2332", margin: 0 }}>Personnes de confiance</p>
          <button onClick={() => setSection("confiance")} style={{ background: "none", border: "none", color: "#4F7FE8", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
            Gérer →
          </button>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {TRUSTED.map((t) => (
            <div key={t.name} style={{
              flex: 1, padding: "14px 16px", borderRadius: 10, background: "#f8f9fb",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: t.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {t.avatar}
              </div>
              <div>
                <p style={{ margin: "0 0 1px", fontWeight: 700, fontSize: 14, color: "#1A2332" }}>{t.name}</p>
                <p style={{ margin: "0 0 3px", fontSize: 12, color: "#6b7280" }}>{t.role}</p>
                <span style={{
                  fontSize: 11, background: "#e0e7ff", color: "#3730a3",
                  borderRadius: 8, padding: "1px 7px", fontWeight: 600,
                }}>{t.access}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Confiance() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Personnes de confiance</SectionTitle>
        <AddBtn label="Ajouter une personne" />
      </div>
      <p style={{ color: "#6b7280", fontSize: 14, margin: "-12px 0 20px" }}>
        Ces personnes pourront accéder à votre dossier selon les droits que vous leur attribuez.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {TRUSTED.map((t) => (
          <Card key={t.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: t.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0,
              }}>
                {t.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 16, color: "#1A2332" }}>{t.name}</p>
                <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>{t.role}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, background: "#e0e7ff", color: "#3730a3", borderRadius: 8, padding: "2px 10px", fontWeight: 600 }}>
                    {t.access}
                  </span>
                  <span style={{ fontSize: 12, background: "#d4f7e7", color: "#1a7a4a", borderRadius: 8, padding: "2px 10px", fontWeight: 600 }}>
                    Invitation acceptée
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 600 }}>
                  Modifier droits
                </button>
                <button style={{ background: "#fef2f2", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 13, cursor: "pointer", color: "#ef4444", fontWeight: 600 }}>
                  Retirer
                </button>
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f3f4f6" }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: "#374151" }}>Sections accessibles :</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Immobilier", "Véhicules", "Investissements", t.access === "Accès complet" ? "Obsèques" : null,
                  t.access === "Accès complet" ? "Dernières volontés" : null,
                  t.role === "Notaire" ? "Assurances" : null,
                ].filter(Boolean).map((sec) => (
                  <span key={sec as string} style={{
                    fontSize: 12, background: "#f3f4f6", color: "#374151",
                    borderRadius: 8, padding: "2px 10px",
                  }}>{sec}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Immobilier() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Biens immobiliers</SectionTitle>
        <AddBtn label="Ajouter un bien" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {IMMOBILIER_ITEMS.map((item) => (
          <Card key={item.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 22 }}>🏠</span>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1A2332" }}>{item.title}</h3>
                  <StatusPill status={item.status} />
                </div>
                <p style={{ margin: "0 0 10px", fontSize: 14, color: "#6b7280" }}>{item.address}</p>
              </div>
              <p style={{ fontWeight: 800, fontSize: 20, color: "#1A2332", margin: 0 }}>{item.value}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Type", val: item.type },
                { label: "Surface", val: item.area },
                { label: "Notaire", val: item.notaire },
              ].map((f) => (
                <div key={f.label} style={{ background: "#f8f9fb", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ margin: "0 0 2px", fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: .5 }}>{f.label}</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#374151", fontWeight: 600 }}>{f.val}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, background: "#e0e7ff", color: "#3730a3", borderRadius: 8, padding: "2px 9px", fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#374151" }}>
                  Modifier
                </button>
                <button style={{ background: "#4F7FE8", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
                  + Ajouter document
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Vehicules() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Véhicules</SectionTitle>
        <AddBtn label="Ajouter un véhicule" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {VEHICULE_ITEMS.map((v) => (
          <Card key={v.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>🚗</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1A2332" }}>{v.title}</h3>
                    <StatusPill status={v.status} />
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{v.year} · {v.immat} · {v.assurance}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 800, fontSize: 18, color: "#1A2332", margin: "0 0 6px" }}>{v.value}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>Modifier</button>
                  <button style={{ background: "#4F7FE8", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: "#fff", fontWeight: 600 }}>Docs</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Investissements() {
  const total = 187000;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <SectionTitle>Investissements & Épargne</SectionTitle>
        <AddBtn label="Ajouter" />
      </div>
      <Card style={{ marginBottom: 20, background: "linear-gradient(135deg, #1A2332, #2d3f58)" }}>
        <p style={{ color: "rgba(255,255,255,.6)", margin: "0 0 4px", fontSize: 13 }}>Patrimoine financier total (estimé)</p>
        <p style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>
          {total.toLocaleString("fr-FR")} €
        </p>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12, margin: 0 }}>5 comptes · dont {INVEST_ITEMS.filter(i => i.benef === "Non défini").length} sans bénéficiaire défini</p>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {INVEST_ITEMS.map((item) => (
          <Card key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1A2332" }}>{item.label}</h3>
                  {item.benef === "Non défini" && (
                    <span style={{ fontSize: 11, background: "#fef3c7", color: "#92400e", borderRadius: 8, padding: "1px 8px", fontWeight: 700 }}>
                      ⚠ Bénéficiaire manquant
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
                  {item.type} · {item.platform} · Bénéficiaire : {item.benef}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 800, fontSize: 18, color: "#1A2332", margin: "0 0 6px" }}>{item.val}</p>
                <button style={{ background: "#4F7FE8", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
                  Détails
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Entreprises() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Entreprises</SectionTitle>
        <AddBtn label="Ajouter une société" />
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12, background: "#fff3e0",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0,
          }}>🏢</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1A2332" }}>Mercier Consulting SAS</h3>
              <StatusPill status="Complet" />
            </div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280" }}>
              SIREN 842 123 456 · Paris (75) · Fondé 2018
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Forme juridique", val: "SAS" },
                { label: "Parts détenues", val: "100 %" },
                { label: "Associés", val: "Aucun autre" },
                { label: "Héritier désigné", val: "Sophie Mercier" },
              ].map((f) => (
                <div key={f.label} style={{ background: "#f8f9fb", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ margin: "0 0 2px", fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase" }}>{f.label}</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#374151", fontWeight: 600 }}>{f.val}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "#fffbeb", borderRadius: 8, padding: "10px 14px", border: "1px solid #fde68a" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#92400e" }}>
                ⚠ Pensez à rédiger des instructions pour la continuité d&apos;activité en cas de décès (procuration, pacte d&apos;associés…).
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Bijoux() {
  const items = [
    { name: "Alliance or 18 carats", cat: "Bijou", val: "3 500 €", loc: "Coffre BNP", photo: true },
    { name: "Montre Rolex Datejust", cat: "Montre", val: "12 000 €", loc: "Maison", photo: true },
    { name: "Bague saphir grand-mère", cat: "Bijou héritage", val: "2 800 €", loc: "Coffre BNP", photo: false },
    { name: "Tableau Moret (huile sur toile)", cat: "Art", val: "8 500 €", loc: "Salon", photo: true },
    { name: "Parure or blanc & diamants", cat: "Bijou", val: "4 200 €", loc: "Coffre BNP", photo: false },
    { name: "Vase Gallé Art Nouveau", cat: "Art", val: "1 800 €", loc: "Bibliothèque", photo: true },
    { name: "Montre Cartier Tank héritage", cat: "Montre héritage", val: "—", loc: "Non localisé", photo: false },
    { name: "Chaîne or 750", cat: "Bijou", val: "1 200 €", loc: "Maison", photo: false },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Bijoux, Montres & Art</SectionTitle>
        <AddBtn label="Ajouter un objet" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((item) => (
          <Card key={item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 15, color: "#1A2332" }}>{item.name}</p>
                <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b7280" }}>{item.cat} · {item.loc}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {item.photo
                    ? <span style={{ fontSize: 11, background: "#d4f7e7", color: "#1a7a4a", borderRadius: 8, padding: "1px 8px", fontWeight: 600 }}>📷 Photo</span>
                    : <span style={{ fontSize: 11, background: "#fee2e2", color: "#991b1b", borderRadius: 8, padding: "1px 8px", fontWeight: 600 }}>Photo manquante</span>
                  }
                </div>
              </div>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#1A2332", margin: 0 }}>{item.val}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Assurances() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Assurances</SectionTitle>
        <AddBtn label="Ajouter une assurance" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {INSURANCE_ITEMS.map((ins) => (
          <Card key={ins.name} style={{ borderLeft: ins.alert ? "3px solid #f59e0b" : "3px solid transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 20 }}>🛡️</span>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1A2332" }}>{ins.name}</h3>
                  {ins.alert && (
                    <span style={{ fontSize: 11, background: "#fef3c7", color: "#92400e", borderRadius: 8, padding: "1px 8px", fontWeight: 700 }}>
                      ⚠ À vérifier
                    </span>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 10 }}>
                  {[
                    { label: "N° contrat", val: ins.num },
                    { label: "Prime annuelle", val: ins.prime },
                    { label: "Bénéficiaire(s)", val: ins.benef || "Non renseigné" },
                    { label: "Échéance", val: ins.expire },
                  ].map((f) => (
                    <div key={f.label} style={{ background: "#f8f9fb", borderRadius: 8, padding: "7px 11px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase" }}>{f.label}</p>
                      <p style={{ margin: 0, fontSize: 13, color: "#374151", fontWeight: 600 }}>{f.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 13, cursor: "pointer", marginLeft: 16 }}>
                Modifier
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Digital() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <SectionTitle>Vie digitale & Accès</SectionTitle>
        <AddBtn label="Ajouter un compte" />
      </div>
      <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#0369a1" }}>
          🔒 Les mots de passe sont chiffrés et jamais visibles en clair. Seules vos personnes de confiance désignées pourront y accéder après votre décès.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DIGITAL_ITEMS.map((item) => (
          <Card key={item.service}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, background: "#f3f4f6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, color: "#374151",
                }}>
                  {item.service[0]}
                </div>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 15, color: "#1A2332" }}>{item.service}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{item.type} · {item.user}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <StatusPill status={item.access === "Enregistré" ? "Complet" : "À compléter"} />
                <select style={{
                  border: "1px solid #d1d5db", borderRadius: 7, padding: "6px 10px",
                  fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer",
                }}>
                  <option>{item.action}</option>
                  <option>Fermer le compte</option>
                  <option>Mémorialiser</option>
                  <option>Transmettre</option>
                  <option>Supprimer</option>
                  <option>Résilier</option>
                </select>
                <button style={{ background: "#4F7FE8", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
                  Modifier
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Volontes() {
  const sections = [
    {
      title: "Message à mes proches",
      icon: "✉️",
      done: false,
      desc: "Un message personnel que vos proches pourront lire après votre départ.",
      placeholder: "Rédigez ici un message pour ceux que vous aimez…",
    },
    {
      title: "Partage des biens",
      icon: "⚖️",
      done: true,
      desc: "Indiquez vos souhaits de répartition (hors testament officiel).",
      placeholder: "",
    },
    {
      title: "Personnes à prévenir",
      icon: "📞",
      done: true,
      desc: "Liste des personnes à contacter en priorité.",
      placeholder: "",
    },
    {
      title: "Testament & notaire",
      icon: "📋",
      done: false,
      desc: "Coordonnées du notaire et référence du testament officiel.",
      placeholder: "Nom du notaire, référence acte…",
    },
    {
      title: "Soins & directives anticipées",
      icon: "🏥",
      done: false,
      desc: "Vos souhaits médicaux en fin de vie (directives anticipées).",
      placeholder: "",
    },
    {
      title: "Dons & legs",
      icon: "💝",
      done: false,
      desc: "Associations, causes ou proches bénéficiaires d'un don particulier.",
      placeholder: "",
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Dernières volontés</SectionTitle>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {sections.map((s) => (
          <Card key={s.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1A2332" }}>{s.title}</h3>
              </div>
              <StatusPill status={s.done ? "Complet" : "À compléter"} />
            </div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280" }}>{s.desc}</p>
            {!s.done && (
              <button style={{
                background: "#4F7FE8", border: "none", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600,
              }}>
                Rédiger →
              </button>
            )}
            {s.done && (
              <button style={{
                background: "#f3f4f6", border: "none", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600,
              }}>
                Modifier
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function Obseques() {
  const prefs = [
    { label: "Type de cérémonie", val: "Laïque", done: true },
    { label: "Mode d'inhumation", val: "Crémation", done: true },
    { label: "Lieu de cérémonie", val: "À préciser", done: false },
    { label: "Musique souhaitée", val: "Non renseigné", done: false },
    { label: "Contrat obsèques", val: "Non souscrit", done: false },
    { label: "Don d'organes", val: "Oui (carte donneur)", done: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle>Obsèques & Funérailles</SectionTitle>
      </div>
      <Card style={{ marginBottom: 20, background: "#f8f9fb", border: "1px solid #e5e7eb" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
          Exprimer vos souhaits permet à vos proches d&apos;honorer votre mémoire sans se poser de questions dans un moment difficile. Ces informations restent privées et ne sont accessibles qu&apos;aux personnes de confiance désignées.
        </p>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {prefs.map((p) => (
          <Card key={p.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: "0 0 3px", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{p.label}</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1A2332" }}>{p.val}</p>
              </div>
              <StatusPill status={p.done ? "Complet" : "À renseigner"} />
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#1A2332" }}>📝 Message pour l&apos;organisation</h3>
        <textarea
          readOnly
          defaultValue="Je souhaite une cérémonie simple et intime, en présence de la famille proche uniquement. Pas de fleurs — une donation à la SPA serait préférable."
          style={{
            width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px",
            fontSize: 14, color: "#374151", resize: "vertical", minHeight: 80, background: "#f8f9fb",
          }}
        />
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button style={{ background: "#4F7FE8", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
            Enregistrer
          </button>
          <button style={{ background: "#f3f4f6", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
            Modifier
          </button>
        </div>
      </Card>
    </div>
  );
}

// ─── Main app ─────────────────────────────────────────────────────────────────

export default function HeritagePage() {
  const [section, setSection] = useState<Section>("dashboard");

  const current = NAV.find((n) => n.section === section);

  function renderSection() {
    switch (section) {
      case "dashboard": return <Dashboard setSection={setSection} />;
      case "confiance": return <Confiance />;
      case "immobilier": return <Immobilier />;
      case "vehicules": return <Vehicules />;
      case "investissements": return <Investissements />;
      case "entreprises": return <Entreprises />;
      case "bijoux": return <Bijoux />;
      case "assurances": return <Assurances />;
      case "digital": return <Digital />;
      case "volontes": return <Volontes />;
      case "obseques": return <Obseques />;
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F2F5", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0, background: "#1A2332", display: "flex",
        flexDirection: "column", padding: "0 0 24px",
      }}>
        {/* Logo / brand */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: .5 }}>HéritageSafe</p>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,.4)" }}>Coffre-fort digital</p>
        </div>

        {/* User */}
        <div style={{ padding: "14px 20px 12px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "#4F7FE8",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
          }}>
            IM
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>Ivan Mercier</p>
            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,.4)" }}>Dossier personnel</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((item) => {
            const active = section === item.section;
            return (
              <button
                key={item.section}
                onClick={() => setSection(item.section)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px",
                  background: active ? "rgba(79,127,232,.2)" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  color: active ? "#7eb3ff" : "rgba(255,255,255,.65)",
                  fontSize: 13,
                  fontWeight: active ? 700 : 400,
                  textAlign: "left",
                  transition: "background .12s",
                }}
              >
                <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && <Badge n={item.badge} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom lock */}
        <div style={{ padding: "0 10px" }}>
          <button style={{
            width: "100%", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)",
            borderRadius: 8, padding: "9px 12px", color: "rgba(239,68,68,.8)",
            fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 600,
          }}>
            🔒 Verrouiller
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "0 28px", height: 58, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1A2332" }}>
              {current?.icon} {current?.label}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={{
              background: "#fef3c7", border: "1px solid #fde68a",
              borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer",
              color: "#92400e", fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>
              🔔 <span>4 rappels</span>
            </button>
            <button style={{
              background: "#f3f4f6", border: "none",
              borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600,
            }}>
              Partager le dossier
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
