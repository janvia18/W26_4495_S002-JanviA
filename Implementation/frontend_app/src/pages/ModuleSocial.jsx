import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModuleSocial() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "social")} />;
}