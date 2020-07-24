import { AccountBudgetProposal } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AccountBudgetProposalService extends Service {
    get(id: number | string): Promise<AccountBudgetProposal>;
    list(options?: ServiceListOptions): Promise<Array<{
        account_budget_proposal: AccountBudgetProposal;
    }>>;
    create(account_budget_proposal: AccountBudgetProposal | Array<AccountBudgetProposal>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(account_budget_proposal: AccountBudgetProposal | Array<AccountBudgetProposal>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
