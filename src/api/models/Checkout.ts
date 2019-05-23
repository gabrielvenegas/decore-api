import { Item } from './Item';
import { Shipping } from './Shipping';
import { Receiver } from './Receiver';
import { Sender } from './Sender';
export class Checkout {
    currency: 'BRL' | 'USD';
    items: Item[];
    redirectUrl: string;
    extraAmount: number;
    shipping: Shipping;
    timeout: number;
    maxAge: '99999999';
    maxUses: '999';
    receiver: Receiver;
    enableRecover: boolean;
    sender: Sender;
}


