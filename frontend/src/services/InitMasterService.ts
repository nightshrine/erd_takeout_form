import { INIT_MASTER_API } from "../constants/ApiConstants";
import { IMasterResponse } from "../definitions/IMasterResponse";
import MenuMaster from "../master/MenuMaster";
import { ApiService } from "./ApiService";

/**
 * マスタ初期化サービス
 */
export class InitMasterService {
  /**
   * メニューマスタ初期化
   */
  public static async init(): Promise<void> {
    // マスタ初期化APIを呼び出す
    const masters = await ApiService.callGetApi<IMasterResponse>(
      INIT_MASTER_API
    );
    MenuMaster.init(masters.product, masters.productCategory);
  }
}
