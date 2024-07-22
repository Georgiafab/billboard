import { AxiosRequestConfig } from "axios";
import axios from "../libs/axios";

export const login = async (data: any) => {
  const response = await axios.post("/v1/login/", data, {
    withCredentials: true,
  });
  return response;
};
export const getAuditAdvertise = async () => {
  const response = await axios.get("/v1/audit/");
  return response.data;
};

export const getAdvertise = async () => {
  const response = await axios.get("/v1/advertise/");
  return response.data;
};

export const addAdvertise = async (data: any) => {
  const response = await axios.post("/v1/advertise", data);
  return response.data;
};

export const auditAdvertise = async ({
  data,
  id,
}: {
  data: any;
  id: number;
}) => {
  const response = await axios.patch("/v1/advertise/" + id, data);
  return response.data;
};
