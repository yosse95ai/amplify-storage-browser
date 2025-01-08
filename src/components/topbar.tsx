import { useNavigate } from "react-router-dom";
import { MY_ROUTES } from "../constant";
import { useAuthenticator } from "@aws-amplify/ui-react";

function TopBar() {
  const navigate = useNavigate();
  const auth = useAuthenticator();
  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="w-full flex justify-between items-center mx-auto p-4">
        <ul className="font-medium flex p-0 rounded-lg flex-row space-x-8 mt-0 border-0 bg-gray-900 border-gray-700">
          {MY_ROUTES.map((route, idx) => (
            <li key={idx}>
              <button
                className="block rounded bg-transparent p-0 text-blue-500"
                aria-current="page"
                onClick={() => navigate(route.path)}
              >
                {route.title}
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => auth.signOut()} className="text-white">
            <svg
              className="w-auto h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
