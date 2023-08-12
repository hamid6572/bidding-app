import getResponse from "../utils/axios";

const bid = async (args: object) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/bids",
      data: { ...args, userId: Number(localStorage.getItem("userId")) },
    },
    true
  );
  return data;
};

export default bid;
