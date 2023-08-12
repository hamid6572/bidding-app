import getResponse from "../utils/axios";

const recharge = async (args: object) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/auth/add-balance",
      data: { ...args, userId: Number(localStorage.getItem("userId")) },
    },
    true
  );
  return data;
};

export default recharge;