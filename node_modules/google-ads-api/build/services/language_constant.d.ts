import { LanguageConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class LanguageConstantService extends Service {
    get(id: number | string): Promise<LanguageConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        language_constant: LanguageConstant;
    }>>;
}
