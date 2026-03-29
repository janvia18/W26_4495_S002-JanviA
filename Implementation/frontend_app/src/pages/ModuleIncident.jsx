import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleIncident() {
  const module = modulesData.find(m => m.key === "incident");
  return <ModuleDetail module={module} />;
}