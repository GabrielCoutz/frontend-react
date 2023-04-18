import axios from "axios";

export const request = async (url: string) => await (await axios.get(url)).data