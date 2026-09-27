import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"

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



export const Orders = () => {
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [orders, setOrders] = useState<any[] | null>(null)

    useEffect(() => {
        const fetchTestimonials = async () => {
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

        fetchTestimonials()
    }, [])

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-700",
            confirmed: "bg-blue-100 text-blue-700",
            completed: "bg-green-100 text-green-700",
            cancelled: "bg-red-100 text-red-700",
        };

        return (
            <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || "bg-gray-100 text-gray-600"
                    }`}
            >
                {status || "pending"}
            </span>
        );
    };
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
    };


    return (
        <>
            <section className="px-4 lg:px-24 py-12 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold">Orders</h1>
                <div className="p-6 py-12 ">
                    {fetchError && <p className="text-red-500">{fetchError}</p>}
                    {orders && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden flex flex-col"
                                >
                                    <div className="px-5 py-4 border-b border-border-soft flex items-center justify-between">
                                        <span className="text-xs font-mono text-text-dim">
                                            #{order.id.slice(0, 8)}
                                        </span>
                                        <StatusBadge status={order.status} />
                                    </div>

                                    <div className="px-5 py-4 space-y-1 border-b border-border-soft">
                                        <p className="font-semibold text-purple-deep">{order.customer_name}</p>
                                        <p className="text-sm text-text-dim">{order.email}</p>
                                        <p className="text-sm text-text-dim">{order.phone}</p>
                                        {order.notes && (
                                            <p className="text-sm text-text-dim">{order.notes}</p>
                                        )}
                                    </div>

                                    <div className="px-5 py-4 border-b border-border-soft flex-1">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-text-dim mb-2">
                                            Items
                                        </p>
                                        <div className="space-y-1.5">
                                            {parseOrderItems(order.items).map((item: any, index: number) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-purple-deep">{item.name}</span>
                                                    <span className="text-text-dim">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-5 py-4 border-b border-border-soft space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-dim">Collection</span>
                                            <span className="text-purple-deep font-medium">
                                                {order.collection_date} · {order.collection_time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="px-5 py-4 flex items-center justify-between">
                                        <span className="text-sm text-text-dim">Total</span>
                                        <span className="text-lg font-bold text-purple-bright">
                                            ${order.total_amount}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </section>
        </>
    )
}