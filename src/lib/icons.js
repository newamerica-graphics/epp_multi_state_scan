import React from "react";
import { colors } from "./colors";

const Empty = () => (
  <svg
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1rem", height: "auto" }}
  >
    <circle
      cx="25"
      cy="25"
      r="24"
      stroke="#2ebcb3"
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

const Half = () => (
  <svg
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ width: "1rem", height: "auto" }}
  >
    <defs>
      <circle id="a" cx="24" cy="24" r="24" />
    </defs>
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <use fill="#2ebcb3" xlinkHref="#a" />
      <path fill="#FFF" mask="url(#b)" d="M-1-1h25v50H-1z" />
      <circle stroke="#2ebcb3" strokeWidth="2" cx="24" cy="24" r="24" />
    </g>
  </svg>
);

const Full = () => (
  <svg
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1rem", height: "auto" }}
  >
    <circle cx="25" cy="25" r="25" fill="#2ebcb3" fillRule="evenodd" />
  </svg>
);

export { Empty, Half, Full };
