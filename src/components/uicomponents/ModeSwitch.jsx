import * as React from 'react'

function darkLight() {
  document.body.classList.toggle('light')
}

const ModeSwitch = () => (
  <button className="modeswitch" onClick={darkLight}>
    <span className="modeswitch__mode darkmode">
      <span className="modescreen"></span>
      <span>Dark</span>
    </span>
    <span className="modeswitch__mode lightmode">
      <span className="modescreen"></span>
      <span>Light</span>
    </span>
  </button>
)

export default ModeSwitch
