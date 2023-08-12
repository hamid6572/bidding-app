import getResponse from "../utils/axios";

export const createProducts = async (args: any) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/products",
      data: { ...args, ownerId: localStorage.getItem("userId") },
    },
    true
  );
  return data;
};

export const getUserProducts = async () => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/products/user",
      data: { userId: Number(localStorage.getItem("userId")) },
    },
    true
  );
  return data;
};

export const getActiveProjects = async () => {
  const data = await getResponse(
    {
      method: "GET",
      url: "/products/active",
    },
    true
  );
  return data;
};

export const getCompletedProjects = async () => {
  const data = await getResponse(
    {
      method: "GET",
      url: "/products/completed",
    },
    true
  );
  return data;
};


export const ActiveProducts = async (args: any) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/products/active-products",
      data: { ...args, ownerId: localStorage.getItem("userId") },
    },
    true
  );
  return data;
};