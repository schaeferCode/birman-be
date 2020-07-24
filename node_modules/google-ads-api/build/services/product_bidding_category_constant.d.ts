import { ProductBiddingCategoryConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class ProductBiddingCategoryConstantService extends Service {
    get(id: number | string): Promise<ProductBiddingCategoryConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        product_bidding_category_constant: ProductBiddingCategoryConstant;
    }>>;
}
