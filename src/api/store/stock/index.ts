import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockVO, StockForm, StockQuery } from '@/api/store/stock/types';

/**
 * 查询库存列表
 * @param query
 * @returns {*}
 */

export const listStock = (query?: StockQuery): AxiosPromise<StockVO[]> => {
  return request({
    url: '/store/stock/list',
    method: 'get',
    params: query
  });
};

export const allListStock = (): AxiosPromise<StockVO[]> => {
  return request({
    url: '/store/stock/all/list',
    method: 'get'
  });
};

/**
 * 查询库存详细
 * @param stockId
 */
export const getStock = (stockId: string | number): AxiosPromise<StockVO> => {
  return request({
    url: '/store/stock/' + stockId,
    method: 'get'
  });
};

/**
 * 新增库存
 * @param data
 */
export const addStock = (data: StockForm) => {
  return request({
    url: '/store/stock',
    method: 'post',
    data: data
  });
};

/**
 * 修改库存
 * @param data
 */
export const updateStock = (data: StockForm) => {
  return request({
    url: '/store/stock',
    method: 'put',
    data: data
  });
};

/**
 * 删除库存
 * @param stockId
 */
export const delStock = (stockId: string | number | Array<string | number>) => {
  return request({
    url: '/store/stock/' + stockId,
    method: 'delete'
  });
};
