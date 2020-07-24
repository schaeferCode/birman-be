import { CarrierConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class CarrierConstantService extends Service {
    get(id: number | string): Promise<CarrierConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        carrier_constant: CarrierConstant;
    }>>;
}
