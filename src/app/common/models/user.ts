import { Transactions } from "./transactions";

export interface User {
    name: string;
    email: string;
    password: string;
    accountAmount: number;
    id: number;
    transactions?: Transactions[];
}
