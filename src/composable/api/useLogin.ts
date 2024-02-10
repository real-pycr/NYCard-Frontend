import request from "./useRequest";

export async function useLogin(username: string, password: string) {
    try {
        return await request({
            method: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password,
            },
        });
    } catch (error) {
        console.error(error);
    }
}