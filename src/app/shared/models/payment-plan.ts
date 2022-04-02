export interface PaymentPlan {
    id?: number;
    planId: number;
    title: string;
    reportType: string;
    clientQuantity:number;
    value: number;  
    valuePerUser?: number;  
}
