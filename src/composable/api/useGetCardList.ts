import request from "./useRequest";

export async function useGetCardList() {
    try {
        return await request({
            method: 'GET',
            url: '/getcardlist',
        });
    } catch (error) {
        console.error(error);
    }
}