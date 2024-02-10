import request from "./useRequest";

export async function useGetPoem() {
    try {
        return await request({
            method: 'GET',
            url: '/getpoem',
        });
    } catch (error) {
        console.error(error);
    }
}