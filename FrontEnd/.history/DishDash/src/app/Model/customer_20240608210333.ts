import { address } from "./address"
import { favdishes } from "./favdishes"
import { favrestaurant } from "./favrestaurant"

export class customer {
<<<<<<< Updated upstream
    customerName: string
    customerEmail: string
    customerPassword: string
    customerProfilePic?: string
    customerPhone: number
    customerAddress?:address[]
=======
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
>>>>>>> Stashed changes
    customerFavRestaurant?:favrestaurant[]
    customerFavDishes?:favdishes[]
}