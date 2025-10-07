export interface StockSkuVO {
  /**
   * 主键
   */
  stockSkuId: string | number;

  /**
   * sku编号
   */
  skuId: string | number;

  /**
   * 库存编号
   */
  stockId: string | number;

  /**
   * 备注
   */
  remark: string;

}

export interface StockSkuForm extends BaseEntity {
  /**
   * 主键
   */
  stockSkuId?: string | number;

  /**
   * sku编号
   */
  skuId?: string | number;

  /**
   * 库存编号
   */
  stockId?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockSkuQuery extends PageQuery {

  /**
   * sku编号
   */
  skuId?: string | number;

  /**
   * 库存编号
   */
  stockId?: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}
