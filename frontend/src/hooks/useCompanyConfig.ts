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

  // Global override for WA links
  useEffect(() => {
    if (query.data && (query.data.whatsapp !== CONTACT.whatsapp || query.data.whatsapp_template)) {
      document.querySelectorAll(`a[href^="https://wa.me/"]`).forEach(el => {
        const anchor = el as HTMLAnchorElement;
        const url = new URL(anchor.href);
        
        // Update number if different
        if (query.data.whatsapp !== CONTACT.whatsapp) {
          url.pathname = `/${query.data.whatsapp}`;
        }

        // Apply template if exists
        if (query.data.whatsapp_template) {
          const finalMessage = query.data.whatsapp_template.replace(/{divisi}/g, 'Aji Institute');
          url.searchParams.set('text', finalMessage);
        }

        anchor.href = url.toString();
      });
    }
  }, [query.data]);

  return { ...query, config };
}
