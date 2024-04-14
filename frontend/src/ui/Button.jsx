import React from "react";

export default function Button({ children, type }) {
  const base = "h-[50px] rounded px-2 w-[200px] smallSr:w-[250px] ";
  // "signupSm:w-[135px] h-[50px] w-[250px] rounded bg-red-300 px-2 transition-colors duration-200 hover:bg-red-400";

  const styles = {
    primary:
      base +
      "signupSm:w-[135px] bg-red-300 transition-colors duration-200 hover:bg-red-400",
    rare:
      base +
      "signupSm:w-[400px] signupSm:text-2xl flex items-center justify-center gap-4 rounded border-2 font-['roboto'] smallSr:text-xl text-lg text-white transition-colors duration-200 hover:bg-red-200 md:w-[500px] lg:w-[400px] lg:text-black xl:w-[500px]",
    secondary:
      base +
      "signupSm:w-[400px] bg-red-300 transition-colors duration-200 hover:bg-red-400 md:w-[500px] lg:w-[400px] xl:w-[500px]",
  };

  return <button className={styles[type]}>{children}</button>;
}
