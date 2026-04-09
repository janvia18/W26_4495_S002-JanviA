/** Route `/modules/mfa` (multi-factor authentication). */
import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleMFA() {
  const module = modulesData.find(m => m.key === "mfa");
  return <ModuleDetail module={module} />;
}