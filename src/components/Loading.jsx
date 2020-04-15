import * as React from 'react'

const Loading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45 45"
    className="loading"
  >
    <g fill="none" strokeWidth="2" transform="translate(1 1)">
      <circle cx="22" cy="22" r="6" stroke="none">
        <animate
          attributeName="r"
          begin="1.5s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="6;22"
        />
        <animate
          attributeName="stroke-opacity"
          begin="1.5s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="1;0"
        />
        <animate
          attributeName="strokeWidth"
          begin="1.5s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="2;0"
        />
      </circle>
      <circle cx="22" cy="22" r="6" stroke="none">
        <animate
          attributeName="r"
          begin="3s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="6;22"
        />
        <animate
          attributeName="stroke-opacity"
          begin="3s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="1;0"
        />
        <animate
          attributeName="strokeWidth"
          begin="3s"
          calcMode="linear"
          dur="3s"
          repeatCount="indefinite"
          values="2;0"
        />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="linear"
          dur="1.5s"
          repeatCount="indefinite"
          values="6;1;2;3;4;5;6"
        />
      </circle>
    </g>
  </svg>
)

export default Loading
