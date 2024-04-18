import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="max-h-auto flex min-h-screen flex-col items-center justify-center pb-4 font-mulish">
      <h1 className="text-[70px] font-extrabold tracking-wider text-red-700 smallSr:text-[100px] signupSm:text-[130px] sm:text-[200px]">
        404
      </h1>
      <h1 className="text-[20px] font-semibold smallSr:text-[25px] signupSm:text-[35px] sm:text-[38px]">
        Oops! Page not found
      </h1>
      <span className="text-[13px] smallSr:text-[15px] signupSm:text-[20px] sm:text-[23px]">
        The page you are looking for cannot be found
      </span>
      <span className="text-[13px] smallSr:text-[15px] signupSm:text-[20px] sm:text-[23px]">
        Take a break before trying again
      </span>
      <Link
        className="mallSr:text-[15px] mt-4 rounded-lg bg-brown p-2 text-[20px] text-white signupSm:text-[25px]"
        to="/"
      >
        Go To Home Page
      </Link>
    </div>
  );
}

export default Error;
