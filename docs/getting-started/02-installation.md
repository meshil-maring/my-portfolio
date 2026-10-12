# 02 – Installation

## Purpose
Clone, install, and run the frontend locally.

> TODO: app not yet scaffolded. These steps assume Vite scaffold lands at repo root.

## Steps
```bash
# 1. Clone
git clone https://github.com/meshil-maring/my-portfolio.git
cd my-portfolio

# 2. (First scaffold only – skip once files exist)
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install motion lucide-react

# 3. Everyday install
npm install

# 4. Run dev server
npm run dev
# → http://localhost:5173
```

## Troubleshooting
| Symptom | Fix |
|---|---|
| `vite: command not found` | `npm install`, then retry |
| Port in use | `npm run dev -- --port 5174` |
| Tailwind classes not applying | Check `tailwind.config.* content` globs + `src/index.css` directives |

## Next
→ `03-scripts.md`
