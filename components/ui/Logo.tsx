import { LOGO_PATHS, LOGO_VIEWBOX, MARCA_PATHS, MARCA_VIEWBOX } from "@/lib/logo-paths";

type Props = {
  variant?: "logo" | "marca";
  className?: string;
  title?: string;
};

/** Logo de Nodus inline, monocolor (hereda currentColor). */
export default function Logo({ variant = "logo", className, title = "Nodus Real Estate" }: Props) {
  const paths = variant === "logo" ? LOGO_PATHS : MARCA_PATHS;
  return (
    <svg
      viewBox={variant === "logo" ? LOGO_VIEWBOX : MARCA_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="currentColor" fillRule="evenodd" />
      ))}
    </svg>
  );
}
