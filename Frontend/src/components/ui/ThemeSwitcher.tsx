import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/slices/theme.slice";
import { useAppSelector } from "../../hooks/UseAppSelector";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <input
      type="checkbox"
      className="theme-checkbox"
      value={theme}
      onClick={toggleTheme}
    />
  );
};

export default ThemeSwitcher;
