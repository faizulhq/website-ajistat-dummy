import { fetchPrograms } from '@/lib/api';
import AjiStatClient from './page-client';

export const dynamic = 'force-static';

export default async function AjiStatPage() {
  const allPrograms = await fetchPrograms();
  return <AjiStatClient allPrograms={allPrograms} />;
}
