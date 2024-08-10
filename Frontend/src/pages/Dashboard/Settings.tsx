import { ThemeSwitcher } from "../../components";

const Settings = () => {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
        Hello From Settings
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Settings;
