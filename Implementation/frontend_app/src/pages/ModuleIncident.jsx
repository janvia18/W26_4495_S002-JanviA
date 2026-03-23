import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModuleIncident() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "incident")} />;
}