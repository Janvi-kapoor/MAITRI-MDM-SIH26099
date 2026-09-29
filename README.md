<div align="center">
  
  # 🏛️ MAITRI-MDM
  **Governed Material Identity Layer for CPSEs**

  [![SIH 2026](https://img.shields.io/badge/Smart_India_Hackathon-2026-F97316?style=for-the-badge&logo=hackaday)](https://sih.gov.in)
  [![Problem Statement](https://img.shields.io/badge/PS-SIH26099-0284C7?style=for-the-badge)](https://sih.gov.in)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![Status](https://img.shields.io/badge/Status-Enterprise_Prototype-10B981?style=for-the-badge)](#)

  <p align="center">
    <strong>AI discovers candidates. Engineering proves compatibility. Human governance decides.</strong>
  </p>

</div>

---

**MAITRI-MDM** is an enterprise-grade prototype designed to help Central Public Sector Enterprises (CPSEs) identify, standardize, and govern technically comparable materials across fragmented ERP catalogues. It creates a unified material identity while preserving each CPSE's existing local codes, ERP ownership, and procurement authority.

---

## 🚨 The Problem: One Material, Many Identities

CPSEs (Oil & Gas, Power, Steel) often maintain different material codes and descriptions for the exact same physical item, leading to duplicate inventory, fragmented demand, and blind cross-CPSE visibility.

| CPSE Entity | Local Code | Raw ERP Description |
| :--- | :--- | :--- |
| <img src="https://img.shields.io/badge/ONGC-D93025?style=flat-square&logo=sap" width="60"> | `A-1045` | SS Pipe 304, 2 in, SCH40, ASTM A312 |
| <img src="https://img.shields.io/badge/IOCL-F2A900?style=flat-square&logo=sap" width="60"> | `P-7781` | Stainless Seamless Pipe 304, 2 in, S40 |
| <img src="https://img.shields.io/badge/BPCL-1E3A8A?style=flat-square&logo=sap" width="60"> | `X-9921` | SS304 Seamless Pipe 2 in, SCH40 |

---

## ⚙️ The Solution: A Governed Identity Layer

MAITRI-MDM acts as an **overlay**—not a replacement—for existing ERPs. It operates on a strict engineering principle:

> 💡 **Core Philosophy:** Similarity is a candidate — not a decision.

### The 3-Stage Engine Architecture
1. **🔍 FIND (AI Discovery):** Retrieves technically plausible candidates from unstructured descriptions and legacy data.
2. **🛡️ PROVE (Engineering Gate):** Validates strict engineering attributes (Grade, Size, Schedule, Standard, UoM). A high AI similarity score *never* overrides a safety-critical mismatch.
3. **👤 GOVERN (Human-in-the-Loop):** Routes the validated evidence package through a Maker–Checker workflow to generate a permanent audit trail.

### 🛑 The Engineering Hard-Stop (Validation in Action)
A schedule 40 pipe cannot safely replace a schedule 80 pipe, regardless of high text similarity. MAITRI handles this deterministically:

```diff
@@ Request: SS304 Pipe | Candidate: SS304 Pipe @@
+ Grade: SS304 (Match)
+ Size: 2 inch (Match)
+ Standard: ASTM A312 (Match)
- Schedule: SCH 80 (CRITICAL CONFLICT - Request was SCH 40)
@@ Result: DO NOT MAP. Governance Alert Triggered. @@
