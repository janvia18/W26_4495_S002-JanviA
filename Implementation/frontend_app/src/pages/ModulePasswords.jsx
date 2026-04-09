/** Route `/modules/passwords`. */
import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModulePasswords() {
  const module = modulesData.find(m => m.key === "passwords");
  return <ModuleDetail module={module} />;
}