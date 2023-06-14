import axios from 'axios'

export const fetchNUI = async (eventName: string, data: any) => {
    const url = `https://${window.GetParentResourceName()}/${eventName}`;
    await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    });
}