import { InfoMessageComponentProps } from "../utils/types";

export const InfoMessage = ({
  message,
}: // type = "error",
InfoMessageComponentProps) => {
  return <p className='error-message-text'>{message}</p>;
};
