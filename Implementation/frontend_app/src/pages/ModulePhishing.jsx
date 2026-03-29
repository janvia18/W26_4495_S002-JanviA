import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModulePhishing() {
  const module = modulesData.find(m => m.key === "phishing");
  return <ModuleDetail module={module} />;
}