import React from "react";

export default function Button({ children, type }) {
  const base = "h-[50px] rounded px-2 w-[200px] smallSr:w-[250px] ";
  // "signupSm:w-[135px] h-[50px] w-[250px] rounded bg-red-300 px-2 transition-colors duration-200 hover:bg-red-400";

  const styles = {
    primary:
      base +
      "signupSm:w-[135px] bg-[#e6e6dd] transition-colors duration-200 hover:bg-[#bbbba5]",
    rare:
      base +
      "signupSm:w-[400px] signupSm:text-2xl flex items-center justify-center gap-4 rounded border-2 border-[#2b2b2b] font-['roboto'] smallSr:text-xl text-lg text-white transition-colors duration-200 hover:bg-[#e6e6dd] lg:hover:bg-[#bbbba5] hover:text-[#2b2b2b] md:w-[500px] lg:w-[400px] lg:text-black xl:w-[500px]",
    secondary:
      base +
      "signupSm:w-[400px] text-[#e6e6dd] bg-[#2b2b2b] transition-colors duration-200 hover:bg-[#bbbba5] md:w-[500px] lg:w-[400px] xl:w-[500px] hover:text-[#2b2b2b]",
  };

  return <button className={styles[type]}>{children}</button>;
}
