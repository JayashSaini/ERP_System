import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const storedTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, [storedTheme]);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <TailSpin
        visible={true}
        height="50"
        width="50"
        color={theme === "dark" ? "#fff" : "#000"}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
