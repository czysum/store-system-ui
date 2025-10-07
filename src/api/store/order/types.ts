export interface OrderVO {
  /**
   * 主键
   */
  orderId: string | number;

  /**
   * 平台订单号
   */
  platformOrder: string;

  /**
   * 平台
   */
  platform: string;

  /**
   * 采购单号
   */
  purchaseOrder: string;

  /**
   * 订单店铺
   */
  shopId: string | number;

  /**
   * 店铺名称
   */
  shopName: string;

  /**
   * 图片
   */
  ossid: string | number;

  /**
   * 图片Url
   */
  ossidUrl: string;
  /**
   * sku名称
   */
  skuName: string;

  /**
   * 商品ID
   */
  platformGoodId: string | number;

  /**
   * 商品编码
   */
  skuId: string | number;

  /**
   * 数量
   */
  orderNum: number;

  /**
   * 销售价
   */
  shopPrise: number;

  /**
   * 成本
   */
  cost: number;

  /**
   * 邮费
   */
  postagePrise: number;

  /**
   * 推广费
   */
  carPrise: number;

  /**
   * 运费险
   */
  postageInsurance: number;

  /**
   * 补偿金
   */
  compensation: number;

  /**
   * 利润
   */
  profit: number;

  /**
   * 订单状态
   */
  orderStatus: string;

  /**
   * 发货单号
   */
  postageOrder: string;

  /**
   * 退货单号
   */
  rePostageOrder: string;

  /**
   * 发货时间
   */
  sendTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderForm extends BaseEntity {
  /**
   * 主键
   */
  orderId?: string | number;

  /**
   * 平台订单号
   */
  platformOrder?: string;

  /**
   * 平台
   */
  platform?: string;

  /**
   * 采购单号
   */
  purchaseOrder?: string;

  /**
   * 订单店铺
   */
  shopId?: string | number;

  /**
   * 店铺名称
   */
  shopName?: string;

  /**
   * 图片
   */
  ossid?: string | number;

  /**
   * sku名称
   */
  skuName?: string;

  /**
   * 商品ID
   */
  platformGoodId?: string | number;

  /**
   * 商品编码
   */
  skuId?: string | number;

  /**
   * 数量
   */
  orderNum?: number;

  /**
   * 销售价
   */
  shopPrise?: number;

  /**
   * 成本
   */
  cost?: number;

  /**
   * 邮费
   */
  postagePrise?: number;

  /**
   * 推广费
   */
  carPrise?: number;

  /**
   * 运费险
   */
  postageInsurance?: number;

  /**
   * 补偿金
   */
  compensation?: number;

  /**
   * 利润
   */
  profit?: number;

  /**
   * 订单状态
   */
  orderStatus?: string;

  /**
   * 发货单号
   */
  postageOrder?: string;

  /**
   * 退货单号
   */
  rePostageOrder?: string;

  /**
   * 发货时间
   */
  sendTime?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderQuery extends PageQuery {

  /**
   * 平台订单号
   */
  platformOrder?: string;

  /**
   * 平台
   */
  platform?: string;

  /**
   * 采购单号
   */
  purchaseOrder?: string;

  /**
   * 订单店铺
   */
  shopId?: string | number;

  /**
   * 店铺名称
   */
  shopName?: string;

  /**
   * sku名称
   */
  skuName?: string;

  /**
   * 商品ID
   */
  platformGoodId?: string | number;

  /**
   * 商品编码
   */
  skuId?: string | number;

  /**
   * 利润
   */
  profit?: number;

  /**
   * 订单状态
   */
  orderStatus?: string;

  /**
   * 发货单号
   */
  postageOrder?: string;

  /**
   * 退货单号
   */
  rePostageOrder?: string;

  /**
   * 发货时间
   */
  sendTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
