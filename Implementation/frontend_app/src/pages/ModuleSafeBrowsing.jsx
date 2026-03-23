import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModuleSafeBrowsing() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "safe-browsing")} />;
}