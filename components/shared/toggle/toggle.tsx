import React, { FC } from "react";
import "./toggle.component.css";

interface ToggleProps {
  size?: string;
  onColor?: string;
  offColor?: string;
  handleColor?: string;
  onToggle?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const Toggle: FC<ToggleProps> = ({
  size,
  onColor,
  offColor,
  handleColor,
  onToggle,
  defaultChecked = false,
}) => {
  const width = `calc(${size} * 2)`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  return (
    <label
      className="toggle-switch"
      style={
        {
          "--toggle-width": width,
          "--toggle-height": size,
          "--toggle-handle-size": `calc(${size} - 10px)`,
          "--toggle-on-color": onColor,
          "--toggle-off-color": offColor,
          "--toggle-handle-color": handleColor,
        } as React.CSSProperties
      }
    >
      <input
        defaultChecked={defaultChecked}
        type="checkbox"
        onChange={handleChange}
      />
      <div className="toggle-switch-background">
        <div className="toggle-switch-handle"></div>
      </div>
    </label>
  );
};

export default Toggle;
