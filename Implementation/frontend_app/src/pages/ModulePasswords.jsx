import React from 'react';
import ModuleDetail from './ModuleDetail';
import { modulesData } from '../lib/modulesData';

export default function ModulePasswords() {
  const module = modulesData?.find(item => item.key === "passwords");
  if (!module) return <div>Loading...</div>;
  return <ModuleDetail module={{ ...module, emoji: "🔐" }} />;
}