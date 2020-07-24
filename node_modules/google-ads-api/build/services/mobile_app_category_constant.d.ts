import { MobileAppCategoryConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class MobileAppCategoryConstantService extends Service {
    get(id: number | string): Promise<MobileAppCategoryConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        mobile_app_category_constant: MobileAppCategoryConstant;
    }>>;
}
