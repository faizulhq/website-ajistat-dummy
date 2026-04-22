'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCompanyConfig } from '@/hooks/useCompanyConfig';

type ConfigContextType = ReturnType<typeof useCompanyConfig>;

const CompanyConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function CompanyConfigProvider({ children }: { children: ReactNode }) {
  const config = useCompanyConfig();
  
  return (
    <CompanyConfigContext.Provider value={config}>
      {children}
    </CompanyConfigContext.Provider>
  );
}

export function useCompanyConfigContext() {
  const context = useContext(CompanyConfigContext);
  if (context === undefined) {
    throw new Error('useCompanyConfigContext must be used within a CompanyConfigProvider');
  }
  return context;
}
