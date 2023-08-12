export function LoginRedirect(response: any, navigate: Function) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.user.name);
    localStorage.setItem("balance", response.data.user.balance);
    localStorage.setItem("userId", response.data.user.id);
    navigate("/dashboard");
}

export function UpdateRecord(response: any, navigate: Function) {
    localStorage.setItem("balance", response.data.balance);
    navigate("/dashboard");
}