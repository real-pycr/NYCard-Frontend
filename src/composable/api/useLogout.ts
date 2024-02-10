import request from "./useRequest";

export async function useLogout() {
    try {
        return await request({
            method: 'DELETE',
            url: '/logout',
        });
    } catch (error) {
        console.error(error);
    }
}