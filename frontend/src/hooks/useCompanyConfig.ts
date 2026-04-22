import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';
import { CONTACT } from '@/lib/config';
import { useEffect } from 'react';

/**
 * Smart division detection: checks WA link text first, then current URL path.
 * Returns the correct division display name for the {divisi} template tag.
 */
function getDivisionFromContext(linkHref: string): string {
  const detectInStr = (str: string): string | null => {
    const s = str.toLowerCase();
    if (s.includes('ajistat')) return 'AjiStat by Aji Institute';
    if (s.includes('ajibiz')) return 'AjiBiz by Aji Institute';
    if (s.includes('ajicomm')) return 'AjiComm by Aji Institute';
    if (s.includes('ajiai')) return 'AjiAI by Aji Institute';
    if (s.includes('ajilingua')) return 'AjiLingua by Aji Institute';
    return null;
  };

  // 1. Check existing WA message text in the link
  try {
    const url = new URL(linkHref);
    const text = url.searchParams.get('text') || '';
    const fromText = detectInStr(text);
    if (fromText) return fromText;
  } catch {
    // ignore URL parse errors
  }

  // 2. Fall back to current URL path (e.g. /program-ajiai, /program-ajibiz, /konsultasi)
  const path = window.location.pathname;
  // /konsultasi maps to AjiStat (it's the AjiStat consultation page)
  if (path.toLowerCase().includes('konsultasi')) return 'AjiStat by Aji Institute';
  const fromPath = detectInStr(path);
  if (fromPath) return fromPath;

  // 3. Default: Aji Institute (umbrella brand)
  return 'Aji Institute';
}

export function useCompanyConfig() {
  const query = useQuery({
    queryKey: ['cms', 'config'],
    queryFn: async () => {
      const res = await cmsApi.config();
      return res.data;
    },
    staleTime: 1000 * 60 * 60, // cache 1 jam
  });

  const config = query.data || {
    whatsapp: CONTACT.whatsapp,
    whatsapp_display: CONTACT.whatsappDisplay,
    email: CONTACT.email,
    instagram: CONTACT.instagram,
    address: CONTACT.address,
    operational_hours: CONTACT.operationalHours,
  };

  // Global override for WA links using event delegation (works with SPA routing)
  useEffect(() => {
    if (!query.data) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('https://wa.me/')) {
        e.preventDefault();
        const url = new URL(href);

        // Update phone number if admin has configured a different one
        if (query.data.whatsapp && query.data.whatsapp !== CONTACT.whatsapp) {
          url.pathname = `/${query.data.whatsapp}`;
        }

        // Apply template with smart division detection
        if (query.data.whatsapp_template) {
          const division = getDivisionFromContext(href);
          const finalMessage = query.data.whatsapp_template.replace(/{divisi}/g, division);
          url.searchParams.set('text', finalMessage);
        }

        window.open(url.toString(), anchor.getAttribute('target') || '_self');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [query.data]);

  return { ...query, config };
}
