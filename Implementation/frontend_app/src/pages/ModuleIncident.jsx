import React from 'react';
import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModuleIncident() {
  const module = modulesData?.find(item => item.key === "incident");
  if (!module) return <div>Loading...</div>;
  return <ModuleDetail module={{ ...module, emoji: "🚨" }} />;
}