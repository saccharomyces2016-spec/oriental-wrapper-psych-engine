# DECISION 0002: Monorepo Structure & Boundaries

**Status:** ACCEPTED  
**Date:** 2026-01-02  
**Scope:** Repository structure + dependency boundaries + enforcement + Phase 2 MVR

## 1) Package Manager
- pnpm workspaces (strict dependency isolation; prevents phantom dependencies)

## 2) Repository Tree (Target)
```text
/ (root)
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── packages/
│   ├── core/
│   │   ├── src/{application,domain,ports,adapters,infra}/
│   │   ├── tests/
│   │   └── scripts/{fixtures,}/
│   ├── data/src/{ontology,psych,metaphysics,legacy}/
│   ├── ui/
│   ├── api/
│   └── tools/
└── docs/
```

## 3) Hard Dependency Rules
- UI runtime imports (Allowed): packages/core/src/application/**, packages/core/src/ports/**
- UI runtime imports (BANNED): packages/core/src/domain/**, packages/core/src/adapters/**, packages/core/src/infra/**
- UI type-only imports: Allowed from anywhere in packages/core/**

## 4) Phase 2 MVR Hard Rules (must hold or Phase 2 fails)
1. Environment Agnostic (Node-only): core must not use window/document/navigator/localStorage etc.
2. No Local FS in Domain: domain/** must not use fs or path.
3. No Implicit Global State: domain must not decide via process.env; inject config via application layer.
4. Zero Circular Dependencies: packages/core/src has no circular deps (enforced by tooling).

## 5) Tooling Enforcement (Phase 2)
- ESLint (UI boundary): no-restricted-imports blocks banned runtime paths.
- madge (Core cycles): npx madge --circular --extensions ts packages/core/src
- Smoke Test input policy: fixed hand-written fixture (stable wiring check)
