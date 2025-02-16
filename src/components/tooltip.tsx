/* eslint-disable @typescript-eslint/no-explicit-any */
import Tooltip from "rc-tooltip";
export function CustomTooltip({
  text,
  children,
}: {
  text: string;
  children: any;
}) {
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
