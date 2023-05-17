export interface User {
    name: string;
    email: string;
    password: string;
    amount: number;
    transactions?: {dateOfPurchase: Date; purchase: string; category: string; amountSpent: number;}[];
}
