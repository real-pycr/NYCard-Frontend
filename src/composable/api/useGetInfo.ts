import request from "./useRequest";

export async function useGetInfo() {
    try {
        return await request({
            method: 'GET',
            url: '/getinfo',
        });
    } catch (error) {
        console.log(error);
    }
}