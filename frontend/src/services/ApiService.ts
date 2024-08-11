import axios, { type AxiosResponse } from "axios";
import { BASE_API_URL } from "../constants/ApiConstants";

/**
 * APIに関する処理を行う
 */
export class ApiService {
  /**
   * GET APIを実行
   */
  public static async callGetApi<T>(url: string): Promise<T> {
    return axios
      .get(BASE_API_URL + url)
      .then((response: AxiosResponse<T>) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  /**
   * POST APIを実行
   */
  public static async callPostApi<T>(url: string, data: T): Promise<void> {
    return axios
      .post(BASE_API_URL + url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response: AxiosResponse<void>) => {
        console.log(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
