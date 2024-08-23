import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  const [color, setColor] = useState("#171717 "); // Default to black for light mode

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (darkMode) {
      setColor("#e5e5e5"); // Set to white for dark mode
    } else {
      setColor("#171717 "); // Set to black for light mode
    }

    // Listen for changes in the theme
    const themeChangeListener = (e: MediaQueryListEvent) => {
      setColor(e.matches ? "#e5e5e5" : "#171717 ");
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", themeChangeListener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", themeChangeListener);
    };
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center dark:bg-neutral-900 bg-neutral-200">
      <TailSpin
        visible={true}
        height="50"
        width="50"
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
