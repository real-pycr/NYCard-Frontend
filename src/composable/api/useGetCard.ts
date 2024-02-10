import request from "./useRequest";

export async function useGetCard(key: string) {
    try {
        return await request({
            method: 'GET',
            url: '/getcard?key=' + key,
        });
    } catch (error) {
        console.error(error);
    }
}