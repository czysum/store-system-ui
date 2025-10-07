export interface StockVO {
  /**
   * 主键
   */
  stockId: string | number;

  /**
   * 商品名称
   */
  stockName: string;

  /**
   * 库存数量
   */
  stockNum: number;

  /**
   * 成本/个/元
   */
  stockCost: number;

  /**
   * ossId
   */
  ossid: string | number;

  /**
   * ossIdUrl
   */
  ossidUrl: string;
  /**
   * 备注
   */
  remark: string;

}

export interface StockForm extends BaseEntity {
  /**
   * 主键
   */
  stockId?: string | number;

  /**
   * 商品名称
   */
  stockName?: string;

  /**
   * 库存数量
   */
  stockNum?: number;

  /**
   * 成本/个/元
   */
  stockCost?: number;

  /**
   * ossId
   */
  ossid?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockQuery extends PageQuery {

  /**
   * 商品名称
   */
  stockName?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
