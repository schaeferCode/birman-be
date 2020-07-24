import { DomainCategory } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class DomainCategoryService extends Service {
    get(id: number | string): Promise<DomainCategory>;
    list(options?: ServiceListOptions): Promise<Array<{
        domain_category: DomainCategory;
    }>>;
}
