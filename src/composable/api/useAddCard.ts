import request from "./useRequest";

export async function useAddCard(from: string, to: string, content: string) {
    try {
        return await request({
            method: 'POST',
            url: '/addcard',
            data: {
                from: from,
                to: to,
                content: content
            }
        });
    } catch (error) {
        console.error(error);
    }
}