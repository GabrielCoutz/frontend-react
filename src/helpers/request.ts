import axios from "axios";

type Endpoint = "/users" | "/products" | "/auth"

export const request = async (endpoint: Endpoint) => await (await axios.get(endpoint, {
  baseURL: 'http://localhost:3000'
})).data