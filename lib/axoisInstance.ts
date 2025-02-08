import axios from "axios";

const deployment = process.env.NEXT_PUBLIC_DEPLOYMENT;

if (!deployment) {
  throw new Error("Deployment not found");
}

const axiosInstance = axios.create({
  baseURL: `${
    deployment !== undefined && deployment === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http:127.0.0.1:8000"
  }/api`,
  timeout: 10000 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
