import outputs from "../../amplify_outputs.json";
import { useState } from "react";

function DistributionURLBar() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    const input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand("copy");
    document.body.removeChild(input);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1024);

    return result;
  };

  return (
    <div className="w-full max-w-lg px-3">
      <div className="flex items-center">
        <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-s-lg bg-gray-600 text-white border-gray-600">
          Distribution URL
        </span>
        <div className="relative w-full">
          <input
            id="website-url"
            type="text"
            aria-describedby="helper-text-explanation"
            className="border border-e-0 text-gray-400 text-sm border-s-0 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            value={outputs.custom.cloudfrontUrl}
            readOnly
            disabled
          />
        </div>
        <button
          data-copy-to-clipboard-target="website-url"
          className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white rounded-e-lg focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 border  border-blue-600  hover:border-blue-700"
          type="button"
          onClick={() => copyToClipboard(outputs.custom.cloudfrontUrl)}
        >
          <span id="default-icon" className={`${copied && "hidden"}`}>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
          <span
            id="success-icon"
            className={`${!copied && "hidden"} inline-flex items-center`}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </button>
        <div
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip bg-gray-700"
        >
          <span id="default-tooltip-message">Copy link</span>
          <span id="success-tooltip-message" className="hidden">
            Copied!
          </span>
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
}

export default DistributionURLBar;
