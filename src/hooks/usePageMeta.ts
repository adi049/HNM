import { useEffect } from "react";
import { crumbsFor, absoluteUrl, SITE_URL } from "../data/seo";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string | null) {
  const el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  const link = el ?? document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (!el) document.head.appendChild(link);
}

/**
 * Per-page title, description, Open Graph tags and — once SITE_URL is set —
 * a canonical URL. Also refreshes BreadcrumbList structured data.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    const desc = description ?? "";
    if (desc) upsertMeta("name", "description", desc);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Hotel ND Manor");
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", desc);

    const hashPath = (window.location.hash.replace(/^#/, "") || "/").split("?")[0];
    const canonical = SITE_URL ? absoluteUrl(hashPath) : null;
    upsertLink("canonical", canonical);
    if (canonical) upsertMeta("property", "og:url", canonical);
    else document.querySelector('meta[property="og:url"]')?.remove();

    const crumbs = crumbsFor(hashPath);
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => {
        const item: Record<string, unknown> = {
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
        };
        const url = absoluteUrl(c.path);
        if (url) item.item = url;
        return item;
      }),
    };
    let script = document.getElementById("nd-breadcrumb") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "nd-breadcrumb";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [title, description]);
}
