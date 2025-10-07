import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockSkuVO, StockSkuForm, StockSkuQuery } from '@/api/store/stockSku/types';

/**
 * 查询库存sku关联列表
 * @param query
 * @returns {*}
 */

export const listStockSku = (query?: StockSkuQuery): AxiosPromise<StockSkuVO[]> => {
  return request({
    url: '/store/stockSku/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询库存sku关联详细
 * @param stockSkuId
 */
export const getStockSku = (stockSkuId: string | number): AxiosPromise<StockSkuVO> => {
  return request({
    url: '/store/stockSku/' + stockSkuId,
    method: 'get'
  });
};


export const findBySkuId = (skuId: string | number): AxiosPromise<StockSkuVO> => {
  return request({
    url: '/store/stockSku/list/stockIds/' + skuId,
    method: 'get'
  });
};




/**
 * 新增库存sku关联
 * @param data
 */
export const addStockSku = (data: StockSkuForm) => {
  return request({
    url: '/store/stockSku',
    method: 'post',
    data: data
  });
};

export const bindStockSkuApi = (data: Array<string | number>) => {
  return request({
    url: '/store/stockSku/bind',
    method: 'post',
    data: data
  });
};


/**
 * 修改库存sku关联
 * @param data
 */
export const updateStockSku = (data: StockSkuForm) => {
  return request({
    url: '/store/stockSku',
    method: 'put',
    data: data
  });
};

/**
 * 删除库存sku关联
 * @param stockSkuId
 */
export const delStockSku = (stockSkuId: string | number | Array<string | number>) => {
  return request({
    url: '/store/stockSku/' + stockSkuId,
    method: 'delete'
  });
};
