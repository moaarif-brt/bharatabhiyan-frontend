const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN ||
  "https://bharatabhiyan.onrender.com";

export const resolveMediaUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_ORIGIN}${path}`;
};
