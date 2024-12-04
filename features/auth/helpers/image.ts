import { PLACEHOLDER_IMAGE_URL } from "@/common/constants";

export const generateImage = (username: string): string => {
  return `${PLACEHOLDER_IMAGE_URL}?username=${username}`;
};
