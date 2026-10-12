# 01 – Config & Strictness

## Purpose
Strict, sane TypeScript for Vite + React.

## Recommended `tsconfig.json` (app)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

## Rules
- `strict: true` stays on. Disable per-line only with a comment + reason.
- `npm run build` must typecheck (`tsc -b && vite build`) — never ship with type errors.
- Fix `noUnusedLocals/Parameters` errors by removing code, not loosening config.

## Next
→ `02-type-conventions.md`
