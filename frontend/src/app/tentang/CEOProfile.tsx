'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';

export function CEOProfile() {
  const { data: dbTeams } = useQuery({
    queryKey: ['cms', 'teams'],
    queryFn: async () => {
      const res = await cmsApi.teams();
      const allTeams = res.data as any[];
      return allTeams.find(t => t.is_ceo);
    },
    staleTime: 1000 * 60 * 5,
  });

  // Fallback to local
  const ceo = dbTeams || {
    name: 'Aji Pamoso, S.Si, M.T',
    role: 'Founder & CEO Aji Institute | Lead Expert AjiStat',
    image: '/images/team/foto-aji-pamoso.jpeg',
    detail: 'PhD Candidate|Department of Social and Behavioural Science, Faculty of Applied Social Sciences.\nPraktisi|Praktisi bidang marketing riset, metodologi, statistik, kewirausahaan dan penelitian operasional.'
  };

  // Parse credentials from detail field (format: "Title|Description" per line)
  const rawDetail = ceo.detail || 'PhD Candidate|Department of Social and Behavioural Science, Faculty of Applied Social Sciences.\nPraktisi|Praktisi bidang marketing riset, metodologi, statistik, kewirausahaan dan penelitian operasional.';
  const credentials = rawDetail.split('\n').filter((line: string) => line.trim() !== '').map((line: string) => {
    const parts = line.split('|');
    return {
      title: parts[0]?.trim() || '',
      desc: parts.slice(1).join('|').trim() || '' // join the rest just in case there are multiple |
    };
  });

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#EEF2FF] to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F0A500]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#1B3A8C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Image */}
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-2 border-[#F0A500] pointer-events-none" />
              <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-3xl bg-[#1B3A8C]/5 pointer-events-none" />
              
              <div className="relative aspect-square lg:aspect-[4/5] xl:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <Image
                  src={ceo.image || '/images/team/foto-aji-pamoso.jpeg'}
                  alt={ceo.name || "CEO"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                  <span className="text-[#1B3A8C] font-black text-xl">AS</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Lead Expert</p>
                  <p className="text-sm font-bold text-[#1B3A8C]">AjiStat Division</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-7/12 mt-10 lg:mt-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#F0A500]" />
              <p className="text-[#F0A500] text-sm font-bold uppercase tracking-[0.2em]">Kepemimpinan</p>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">{ceo.name.split(',')[0]}, <span className="font-bold text-3xl text-gray-600">{ceo.name.includes(',') ? ceo.name.substring(ceo.name.indexOf(',') + 1) : ''}</span></h2>
            <p className="text-xl text-[#1B3A8C] font-semibold mb-8">{ceo.role}</p>

            {/* Credentials - DYNAMICALLY RENDERED */}
            <div className="space-y-5">
              {credentials.map((cred: {title: string, desc: string}, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${index % 2 === 0 ? 'bg-[#F0A500]/10' : 'bg-[#1B3A8C]/10'}`}>
                    <span className={`font-bold text-sm ${index % 2 === 0 ? 'text-[#F0A500]' : 'text-[#1B3A8C]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{cred.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {cred.desc || cred.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
