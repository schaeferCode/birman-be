import { AccountBudget } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class AccountBudgetService extends Service {
    get(id: number | string): Promise<AccountBudget>;
    list(options?: ServiceListOptions): Promise<Array<{
        account_budget: AccountBudget;
    }>>;
}
