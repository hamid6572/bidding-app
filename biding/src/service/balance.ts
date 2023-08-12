import getResponse from "../utils/axios";

const getBalance = async () => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/auth/balance",
      data: { userId: Number(localStorage.getItem("userId")) },
    },
    true
  );
  localStorage.setItem("balance", data.data.balance);
//   return data;
};

export default getBalance;
