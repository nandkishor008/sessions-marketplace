import api from "./axios";

export const getSessions = async () => {

  const response = await api.get("/sessions/");

  return response.data;
};

export const createSession = async (data) => {

  const response = await api.post(
    "/sessions/create/",
    data
  );

  return response.data;
};

export const deleteSession = async (id) => {

  const response = await api.delete(
    `/sessions/delete/${id}/`
  );

  return response.data;
};