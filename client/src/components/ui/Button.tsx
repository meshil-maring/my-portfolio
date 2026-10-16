import { cn } from "@/lib/cn";

interface SharedProps {
  variant?: "primary" | "secondary";
  className?: string;
}

type ButtonAsButton = SharedProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsLink = SharedProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = ButtonAsButton | ButtonAsLink;

// design-system §05: 44px min, 8px radius (rounded-btn), 13px/700, px-5.
// `href` renders an <a> with the exact same styles so navigation CTAs
// (Hero, Contact) share one button design instead of re-copying classes.
function buttonClass(variant: "primary" | "secondary", className?: string) {
  return cn(
    "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-btn px-5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variant === "primary" && "bg-accent text-accent-text hover:-translate-y-0.5 hover:opacity-90",
    variant === "secondary" &&
      "border border-border bg-surface text-text hover:-translate-y-0.5 hover:border-accent",
    className,
  );
}

// Props consumed above / by the render target — never spread onto the element.
const SHARED_PROPS = new Set(["variant", "className", "children", "href"]);

function restProps(props: ButtonProps): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!SHARED_PROPS.has(key)) out[key] = value;
  }
  return out;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = buttonClass(variant, className);
  const href = props.href;

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(restProps(props) as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(restProps(props) as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
