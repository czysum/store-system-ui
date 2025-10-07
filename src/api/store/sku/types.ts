import {StockVO} from "@/api/store/stock/types";

export interface SkuVO {
  /**
   * 主键
   */
  skuId: string | number;

  /**
   * sku名称
   */
  skuName: string;

  /**
   * 库存id
   */
  stockId: string | number;

  /**
   * ossId
   */
  ossid: string | number;

  /**
   * ossIdUrl
   */
  ossidUrl: string;
  /**
   * 扣除数量
   */
  deductNum: number;

  /**
   * 备注
   */
  remark: string;

  //接受后台来的库存列表
  tbStockVos:Array<StockVO>;

  //解析后显示的库存名称
  stockNamesStr:String;
}

export interface SkuForm extends BaseEntity {
  /**
   * 主键
   */
  skuId?: string | number;

  /**
   * sku名称
   */
  skuName?: string;

  /**
   * 库存id
   */
  stockId?: string | number;

  /**
   * ossId
   */
  ossid?: string | number;

  /**
   * 扣除数量
   */
  deductNum?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface SkuQuery extends PageQuery {

  /**
   * sku名称
   */
  skuName?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
