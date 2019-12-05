import { product } from './product';


export interface bill{
    billId:number
    billDate:Date
    product:product
    quantity:number

}