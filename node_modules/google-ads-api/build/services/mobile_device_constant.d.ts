import { MobileDeviceConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class MobileDeviceConstantService extends Service {
    get(id: number | string): Promise<MobileDeviceConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        mobile_device_constant: MobileDeviceConstant;
    }>>;
}
