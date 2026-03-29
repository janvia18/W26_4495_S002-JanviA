import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleSafeBrowsing() {
  const module = modulesData.find(m => m.key === "safeBrowsing");
  return <ModuleDetail module={module} />;
}