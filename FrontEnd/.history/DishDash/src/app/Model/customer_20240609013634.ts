import { favdishes } from "./favdishes"
import { favrestaurant } from "./favrestaurant"

export class customer {
    customerId?:string
    customerName?: string
    customerEmail?: string
    customerPassword?: string
    confirmPassword?:string
    customerProfilePic?: string
    customerPhone?: number
    customerAddress?:{
        address1?:string
        landMark?:string
        city?:string
        pinCode?:string
        currentLocation?:string
    }
    customerFavRestaurant?:favrestaurant[]
    customerFavDishes?:favdishes[]
}