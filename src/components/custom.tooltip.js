import Tooltip from "rc-tooltip";

export function CustomToolTip({ text, children }) {
  return (
    <Tooltip
      placement='right'
      trigger={["hover"]}
      overlay={<span>{text}</span>}
      overlayInnerStyle={{
        minWidth: "120px",
        maxWidth: "300px",
        display: "flex",
      }}
    >
      {children}
    </Tooltip>
  );
}
