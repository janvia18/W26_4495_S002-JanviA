import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

export default function ModulePasswords() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "passwords")} />;
}