import axios, { AxiosResponse } from 'axios'

export async function fetchNUI<TData, TResponse>(event: string, data: TData): Promise<TResponse> {
    const url = `https://${window.GetParentResourceName()}/${event}`;

    const response = await axios.post<TData, AxiosResponse<TResponse>>(url, data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });

    return response.data;
}