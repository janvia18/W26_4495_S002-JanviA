import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModulePhishing() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "phishing")} />;
}