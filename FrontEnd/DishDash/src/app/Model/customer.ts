import { address } from "./address"
import { favdishes } from "./favdishes"
import { favrestaurant } from "./favrestaurant"
import { FileHandle } from "./file-handle"

export class customer {
    customerId:string
    customerName?: string
    customerEmail?: string
    customerPassword?: string
    customerProfilePic?: FileHandle
    customerPhone?: number
    customerAddress?:address[]
    customerFavRestaurants?:string[]
    customerFavDishes?:favdishes[]
    customerCartId?:string
}
