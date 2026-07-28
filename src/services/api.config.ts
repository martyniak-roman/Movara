export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const HEADERS = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};
