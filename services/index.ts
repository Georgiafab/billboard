import { AxiosRequestConfig } from "axios";
import axios from "../libs/axios";

export const getAdvertise = async () => {
  const response = await axios.get("/v1/advertise/?format=json");
  return response.data;
};

export const addAdvertise = async (data: any) => {
  const response = await axios.post("/v1/advertise", data);
  return response.data;
};

export const auditAdvertise = async ({
  data,
  id,
  config,
}: {
  data: any;
  id: number;
  config: AxiosRequestConfig<any>;
}) => {
  const response = await axios.patch("/v1/advertise/" + id, data, config);
  return response.data;
};
