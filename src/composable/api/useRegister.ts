import request from "./useRequest";

export async function useRegister(username: string, password: string, qqnumber: string) {
    try {
        return await request({
            method: 'POST',
            url: '/register',
            data: {
                username: username,
                password: password,
                qqnumber: qqnumber
            },
        });
    } catch (error) {
        console.error(error);
    }
}