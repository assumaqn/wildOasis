import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../Context/DarkModeContext";
function DarkMode() {
  const { isDark, toggleDark } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDark}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
export default DarkMode;
