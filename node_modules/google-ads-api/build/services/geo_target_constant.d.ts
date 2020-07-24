import { GeoTargetConstant, SuggestGeoTargetConstantsRequest } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class GeoTargetConstantService extends Service {
    get(id: number | string): Promise<GeoTargetConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        geo_target_constant: GeoTargetConstant;
    }>>;
    suggest(options: SuggestGeoTargetConstantsRequest): Promise<any>;
}
