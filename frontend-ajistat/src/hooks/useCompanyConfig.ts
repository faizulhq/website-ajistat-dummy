'use client';

import { useState, useEffect } from 'react';
import { CONTACT } from '@/lib/config';

type ConfigData = {
  whatsapp: string;
  whatsapp_display: string;
  email: string;
  instagram: string;
  address: string;
  operational_hours: string;
};

export function useCompanyConfig() {
  const [config, setConfig] = useState<ConfigData>({
    whatsapp: CONTACT.whatsapp,
    whatsapp_display: CONTACT.whatsappDisplay,
    email: CONTACT.email,
    instagram: '',
    address: CONTACT.address,
    operational_hours: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';
        const res = await fetch(`${API_BASE}/api/cms/config/`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setConfig(json.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch CMS config:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchConfig();
  }, []);

  // Global override for WA links
  useEffect(() => {
    if (config.whatsapp !== CONTACT.whatsapp) {
      document.querySelectorAll(`a[href^="https://wa.me/${CONTACT.whatsapp}"]`).forEach(el => {
        const anchor = el as HTMLAnchorElement;
        const url = new URL(anchor.href);
        url.pathname = `/${config.whatsapp}`;
        anchor.href = url.toString();
      });
    }
  }, [config.whatsapp]);

  return { config, isLoading };
}
