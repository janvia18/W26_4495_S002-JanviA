import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModuleMFA() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "mfa")} />;
}