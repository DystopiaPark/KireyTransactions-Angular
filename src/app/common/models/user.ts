import { Transactions } from "./transactions";

export interface User {
    name: string;
    email: string;
    password: string;
    amount: number;
    id: number;
    transactions?: Transactions[];
}
