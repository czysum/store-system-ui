import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SkuVO, SkuForm, SkuQuery } from '@/api/store/sku/types';

/**
 * 查询sku列表
 * @param query
 * @returns {*}
 */

export const listSku = (query?: SkuQuery): AxiosPromise<SkuVO[]> => {
  return request({
    url: '/store/sku/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询sku详细
 * @param skuId
 */
export const getSku = (skuId: string | number): AxiosPromise<SkuVO> => {
  return request({
    url: '/store/sku/' + skuId,
    method: 'get'
  });
};

/**
 * 新增sku
 * @param data
 */
export const addSku = (data: SkuForm) => {
  return request({
    url: '/store/sku',
    method: 'post',
    data: data
  });
};

/**
 * 修改sku
 * @param data
 */
export const updateSku = (data: SkuForm) => {
  return request({
    url: '/store/sku',
    method: 'put',
    data: data
  });
};

/**
 * 删除sku
 * @param skuId
 */
export const delSku = (skuId: string | number | Array<string | number>) => {
  return request({
    url: '/store/sku/' + skuId,
    method: 'delete'
  });
};
