import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleSocial() {
  const module = modulesData.find(m => m.key === "social");
  return <ModuleDetail module={module} />;
}