import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';
import { CONTACT } from '@/lib/config';
import { useEffect } from 'react';

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
        
        // Update number if different
        if (query.data.whatsapp && query.data.whatsapp !== CONTACT.whatsapp) {
          url.pathname = `/${query.data.whatsapp}`;
        }

        // Apply template if exists
        if (query.data.whatsapp_template) {
          const finalMessage = query.data.whatsapp_template.replace(/{divisi}/g, 'Aji Institute');
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
