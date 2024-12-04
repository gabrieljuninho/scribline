import DOMPurify from "isomorphic-dompurify";

type SanitizeValuesProps = {
  username?: string;
  email: string;
  password: string;
};

export const sanitizeValues = (
  data: SanitizeValuesProps
): SanitizeValuesProps => {
  const sanitizedUsername = DOMPurify.sanitize(data.username as string);
  const sanitizedEmail = DOMPurify.sanitize(data.email);
  const sanitizedPassword = DOMPurify.sanitize(data.password);

  return {
    username: sanitizedUsername,
    email: sanitizedEmail,
    password: sanitizedPassword,
  };
};
