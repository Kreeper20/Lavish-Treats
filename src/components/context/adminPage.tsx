import { useState, useEffect, useRef } from "react"
import { supabase } from "../../../src/supabase";
import { IconX } from "@tabler/icons-react";

const parseOrderItems = (items: unknown): any[] => {
    if (Array.isArray(items)) return items
    if (typeof items !== 'string') return []

    try {
        const parsedItems = JSON.parse(items)
        return Array.isArray(parsedItems) ? parsedItems : []
    } catch {
        return []
    }
}
const tableHeaders = [
    "Order ID",
    "Customer Name",
    "Collection Date",
    "Items",
    "Total Amount",
    "Order Status",
]
const tableHeaderClasses = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"




export const Orders = () => {

    const [fetchError, setFetchError] = useState<string | null>(null)
    const [orders, setOrders] = useState<any[] | null>(null)
    const ORDER_STATUS = ["Delivered", "Confirmed", "Cancelled"];
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const selectedOrder = orders?.find((o) => o.id === selectedId) ?? null


    const styles: Record<string, string> = {
        Confirmed: "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            const { error } = await supabase
                .from("orders")
                .update({ order_status: newStatus })
                .eq("id", orderId);

            if (error) {
                console.error("Error updating order status:", error);
                return;
            }

            setOrders((prevOrders) =>
                prevOrders?.map((order) =>
                    order.id === orderId ? { ...order, order_status: newStatus } : order
                ) || null
            );
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const { data, error } = await supabase.from("orders").select()
            if (error) {
                setFetchError("Could not fetch the orders")
                setOrders(null)
                console.log(error)
            };
            if (data) {
                console.log(data)
                setOrders(data)
                setFetchError(null)
            }

        };

        fetchOrders()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
    };

    const cell =
        "px-6 py-4 whitespace-nowrap " +
        "max-md:flex max-md:justify-between max-md:gap-4 max-md:whitespace-normal max-md:px-0 max-md:py-2 max-md:text-right " +
        "max-md:before:block max-md:before:shrink-0 max-md:before:text-left max-md:before:text-xs max-md:before:font-semibold max-md:before:uppercase max-md:before:tracking-wide max-md:before:text-gray-500 max-md:before:content-[attr(data-label)]"



    return (
        <>
            {fetchError && <p className="text-red-500 text-center">{fetchError}</p>}
            <section className="items-center mb-6 max-w-7xl mx-auto px-4 py-6 md:px-8 lg:py-12">
                <div>
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-purple-deep">Orders</h1>
                        <h2 className="text-sm text-text-muted">Manage your orders and update their status</h2>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-purple-deep">Orders</h1>
                        {orders && <p className="text-sm text-text-muted">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

            </section>
            <section className="mx-auto max-w-7xl px-4 py-12 md:overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 max-md:block">
                    <thead className="bg-gray-50 max-md:hidden">
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header} scope="col" className={tableHeaderClasses}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white max-md:block max-md:space-y-4 max-md:divide-y-0 max-md:bg-transparent">
                        {orders
                            ?.slice()
                            .sort((a, b) => Number(b.id) - Number(a.id))
                            .map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => setSelectedId(order.id)}
                                    className="cursor-pointer transition-colors duration-300 hover:bg-gray-50 max-md:block max-md:rounded-2xl max-md:border max-md:border-gray-200 max-md:bg-white max-md:p-4 max-md:shadow-sm"
                                >
                                    <td data-label="Order" className={`${cell} font-medium`}>
                                        #{order.id}
                                    </td>

                                    <td data-label="Customer" className={cell}>
                                        <span className="flex flex-col text-left max-md:items-end max-md:text-right">
                                            <span>{order.customer_name}</span>
                                            <span className="text-sm text-text-dim">{order.email}</span>
                                        </span>
                                    </td>

                                    <td data-label="When" className={cell}>
                                        <span className="flex flex-col text-left max-md:items-end max-md:text-right">
                                            <span className="w-fit rounded-full bg-purple-soft px-2 py-0.5 text-sm capitalize">
                                                {order.fulfillment_type}
                                            </span>
                                            <span>{order.collection_date}</span>
                                            <span>{order.collection_time}</span>
                                        </span>
                                    </td>

                                    <td data-label="Items" className={`${cell} whitespace-normal`}>
                                        <span className="flex flex-col text-left max-md:items-end max-md:text-right">
                                            {parseOrderItems(order.items).map((item: any, index: number) => (
                                                <span key={index} className="flex gap-3 text-sm">
                                                    <span className="text-purple-deep">{item.name}</span>
                                                    <span className="text-text-dim">x{item.quantity}</span>
                                                </span>
                                            ))}
                                        </span>
                                    </td>

                                    <td data-label="Total" className={`${cell} font-semibold`}>
                                        £{order.total_amount}
                                    </td>

                                    <td data-label="Status" className={cell}>
                                        <select
                                            className={`rounded-2xl px-2.5 py-1 text-xs font-semibold capitalize ${styles[order.order_status] || "bg-gray-100 text-gray-600"}`}
                                            value={order.order_status ?? "pending"}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            {ORDER_STATUS.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
            <OrderDrawer
                order={selectedOrder}
                onClose={() => setSelectedId(null)}
                onStatusChange={handleStatusChange}
                styles={styles}
            />
        </>
    )
}

export const OrderDrawer = ({ order, onClose, onStatusChange, styles }: {
    order: any | null
    onClose: () => void
    onStatusChange: (id: number, status: string) => void
    styles: Record<string, string>
}) => {
    const open = order !== null
    const last = useRef(order)
    if (order) last.current = order
    const view = order ?? last.current
    const ORDER_STATUS = ["Delivered", "Confirmed", "Cancelled"];
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);


    return (
        <>
            <div onClick={onClose}
                className={`fixed inset-0 z-40 bg-purple-deep/60 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
            <aside
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
                {view && (
                    <>
                        <div className="flex items-start justify-between border-b border-line pb-4 mb-4">
                            <div className="me-auto">
                                <h1 className="text-2xl font-serif font-semibold text-purple-deep">
                                    LT-{String(view.id).padStart(4, "0")}
                                </h1>
                                <h2 className="text-sm font-semibold text-text-muted">
                                    Order placed on <span className="ml-1 font-normal">{new Date(view.created_at).toLocaleString()}</span>
                                </h2>
                                <p className="text-sm text-text-muted">
                                    Paid via Stripe

                                </p>
                                <select
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-xl capitalize ${styles[view.order_status] || "bg-gray-100 text-gray-600"}`}
                                    value={view.order_status ?? "pending"}

                                    onChange={(e) =>
                                        onStatusChange(order.id, e.target.value)
                                    }
                                >
                                    {ORDER_STATUS.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-text-body hover:text-purple-primary transition cursor-pointer"
                            >
                                <IconX className="w-6 h-6" />
                            </button>

                        </div>
                        <div className="space-y-2 mb-4 border-b border-line pb-4">
                            <h2 className="text-lg font-semibold text-purple-deep">Customer Details</h2>
                            <h3 className="text-base font-medium text-text-body">{view.customer_name}</h3>
                            <p>{view.phone}</p>
                            <a href={`mailto:${view.email}`} className=" underline">
                                {view.email}
                            </a>
                        </div>
                        <div className="space-y-2 mb-4 border-b border-line pb-4">
                            <h2 className="text-lg capitalize font-semibold text-purple-deep">
                                {view.fulfillment_type}
                            </h2>
                            <div className="flex gap-2 justify-between">
                                <span> {view.collection_date} </span>
                                <span> {view.collection_time} </span>
                            </div>
                            {view.fulfillment_type === "delivery" && (
                                <p>{view.address_line}, {view.city}, {view.postal_code}</p>
                            )}
                        </div>
                        <div className="space-y-2 mb-4 border-b border-line pb-4">
                            <h2 className="text-lg capitalize font-semibold text-purple-deep">
                                Items
                            </h2>
                            {parseOrderItems(view.items).map((item: any, i: number) => (
                                <div className="flex gap-6 justify-between" key={i}>
                                    <span className="mb-6">{item.name} x{item.quantity}</span>
                                    <span className="ml-auto">£{item.price}</span>

                                </div>
                            ))}

                            <div className="flex gap-2 justify-between text-xl font-semibold text-purple-deep ">
                                <span>Total</span>
                                <span className="ml-auto">£{view.total_amount}</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4 border-b border-line pb-4">
                            <h2 className="text-lg capitalize font-semibold text-purple-deep">
                                Customer Notes
                            </h2>
                            <p className="bg-lilac-panel p-3 rounded-xl">{view.notes || "No notes provided."}</p>

                        </div>
                    </>
                )}
            </aside>
        </>
    )
}