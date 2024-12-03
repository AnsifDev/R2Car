"use client"

import products from "@/products";
import { createContext, useContext, useState } from "react";

type UserOrders = Record<string, number>

type OrderContextParams = [
    UserOrders,
    (_id: string, newCount: number) => void
]

const OrderContext = createContext<OrderContextParams>([{}, () => {}])

export function OrderContextProvider({ children }: { children?: React.ReactNode }) {
    const [orders, updateOrders] = useState<UserOrders>({});

    return (
        <OrderContext.Provider value={[ orders, (_id, count) => updateOrders({ ...orders, [_id]: count })]}>
            {children}
        </OrderContext.Provider>
    )
}

export function OrderSpinner({ orderId }: { orderId: string }) {
    const [ orders, updateOrders ] = useContext(OrderContext);
    const count = orderId in orders? orders[orderId]: 0

    return (
        <div className="flex border mt-4 border-black dark:border-white rounded-md overflow-clip select-none">
            <button disabled={count == 0} onClick={() => updateOrders(orderId, count-1)} className="material-symbols-rounded filled-icons py-1 px-2 dark:text-white hover:bg-black/20 active:bg-black/30 disabled:text-neutral-400 disabled:bg-transparent disabled:dark:text-neutral-600">remove</button>
            <div className="w-[1px] bg-black dark:bg-white"/>
            <div className="self-center min-w-16 text-center dark:text-white">{count}</div>
            <div className="w-[1px] bg-black dark:bg-white"/>
            <button onClick={() => updateOrders(orderId, count+1)} className="material-symbols-rounded filled-icons py-1 px-2 dark:text-white hover:bg-black/20 active:bg-black/30">add</button>
        </div>
    );
}

function findTotalPrice(orders: UserOrders) {
    let sum = 0;
    products.forEach((v) => sum += v._id in orders? orders[v._id]*v.price: 0)
    // Object.keys(orders).map((v) => orders[v]).forEach((v) => sum += v*[]);
    return sum
}

export function OrderPlacerBar() {
    const orders = useContext(OrderContext)[0];
    const totalPrice = findTotalPrice(orders);
    
    return (
        <div className={`p-3 bg-blue-200 dark:bg-gray-800 md:border border-t border-gray-700 dark:text-white md:rounded-lg ${totalPrice > 0? 'flex': 'hidden'} justify-between items-center w-full max-w-[720px] md:m-6`}>
            <div className="font-bold ml-3">Payable Amount: &#8377; {totalPrice}/-</div>
            <button className="bg-black dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-200 active:hover:bg-neutral-800 dark:active:hover:bg-neutral-400 text-white dark:text-black py-1 px-3 rounded-md">Place Order</button>
        </div>
    )
}