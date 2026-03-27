import React from 'react';
import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleMFA() {
  const module = modulesData?.find(item => item.key === "mfa");
  if (!module) return <div>Loading...</div>;
  return <ModuleDetail module={{ ...module, emoji: "📱" }} />;
}