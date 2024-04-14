import { Link } from "react-router-dom";
// import LinkButton from "./LinkButton";

function Error() {
  return (
    <div>
      <h1>Something went wrong 😢</h1>

      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Error;
