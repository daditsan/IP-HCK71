import { Link } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";

export default function LoginPage() {
  return (
    <>
      <NavbarLogin />
      <div
        style={{
          paddingTop: "180px",
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@mail.com"
              required=""
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required=""
              placeholder="enter your password"
            />
          </div>
          <div className="flex items-start mb-5"></div>
          <button
            type="submit"
            className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ width: "100%" }}
          >
            Login
          </button>
          <div style={{ justifyContent: "center", marginTop: "10px" }}>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Don&apos;t have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Register here
              </Link>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
