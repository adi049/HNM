import { Link, useLocation } from "react-router-dom";
import { crumbsFor } from "../data/seo";
import { Eyebrow } from "./ui";

export function PageBanner({
  image,
  alt,
  eyebrow,
  title,
  intro,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);

  return (
    <section className="relative flex min-h-[52svh] items-end overflow-hidden bg-charcoal pt-20">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
        <div className="max-w-2xl animate-fade-up">
          <nav aria-label="Breadcrumb" className="mb-4 text-[0.62rem] uppercase tracking-[0.22em] text-ivory/70">
            {crumbs.map((c, i) => (
              <span key={c.path}>
                {i > 0 && <span className="mx-2 text-gold/80">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="text-ivory">{c.name}</span>
                ) : (
                  <Link to={c.path} className="hover:text-gold">
                    {c.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          <Eyebrow className="text-gold">{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ivory md:text-6xl">{title}</h1>
          {intro && (
            <p className="mt-5 text-sm font-light leading-[1.9] text-ivory/80 md:text-base">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
