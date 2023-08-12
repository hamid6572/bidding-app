import getResponse from "../utils/axios";

interface register {
  email: string;
  password: string;
}

const register = async (args: any) => {
  const data = await getResponse(
    {
      method: "POST",
      url: "/auth/register",
      data: args,
    },
    false
  );
  return data;
};

export default register;
