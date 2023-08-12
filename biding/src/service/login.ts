import getResponse from "../utils/axios";

const login = async (args: object) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/auth/login",
      data: args,
    },
    false
  );
  return data;
};

export default login;
