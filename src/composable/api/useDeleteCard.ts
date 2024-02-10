import request from "./useRequest";

export async function useDeleteCard(ID: string) {
    try {
        return await request({
            method: 'DELETE',
            url: '/deletecard/' + ID,
        });
    } catch (error) {
        console.error(error);
    }
}