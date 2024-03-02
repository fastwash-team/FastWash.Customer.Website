import { InfoMessageComponentProps } from "../utils/types";

export const InfoMessage = ({
  message,
}: // type = "error",
InfoMessageComponentProps) => {
  return <h6 className='error-message-text'>{message}</h6>;
};
