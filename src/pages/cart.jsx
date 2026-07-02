import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useGetCart } from "../hooks/useGetCart";
import { useUpdateQty } from "../hooks/useUpadateQty";
import { useRemoveItem } from "../hooks/useRemoveItem";
import { handleBuyNow } from "../utils/deliveryFunction";

export default function Cart() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate()

  const { data: cart, isLoading, error } = useGetCart();

  const { mutate: updateQty } = useUpdateQty();
  const { mutate: removeItem } = useRemoveItem();

  if (authLoading)
    return <h1 className="text-center mt-10">Loading...</h1>;

  if (!user)
    return <h1 className="text-center mt-10">Please Login</h1>;

  if (isLoading)
    return <h1 className="text-center mt-10">Loading...</h1>;

  if (error)
    return <h1 className="text-center mt-10 text-red-500">Error</h1>;

  const products = cart?.products || [];

  const total = products.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  return (
    <div className="p-6 bg-[#dcfff9] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛒 My Cart</h1>

      <div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.length === 0 ? (
            <div className="text-center p-10">
              <h2 className="text-xl font-bold">🛒 Cart is Empty</h2>
              <p className="text-gray-500 mt-2">
                Add some products to your cart.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            products.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="mt-4 text-center flex flex-col flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.productId.name}
                  </h2>

                  <p className="text-gray-600 mt-1 text-center">
                    ₹{item.productId.price}
                  </p>

                  <div className="flex justify-center items-center gap-3 mt-3">
                    <button
                      className="px-2 rounded-lg bg-gray-200 hover:bg-gray-400"
                      onClick={() =>
                        updateQty({
                          productId: item.productId._id,
                          action: "dec",
                        })
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="px-2 rounded-lg bg-gray-200 hover:bg-gray-400"
                      onClick={() =>
                        updateQty({
                          productId: item.productId._id,
                          action: "inc",
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-auto flex justify-center">
                    <button
                      className="bg-red-100 text-red-600 px-4 py-2 mt-3 h-fit rounded-lg hover:bg-red-200 self-center"
                      onClick={() =>
                        removeItem(item.productId._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-2xl border-t border-gray-300 p-3 z-50">
          <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between px-4">

            <div className="flex flex-col md:flex-row justify-start gap-4">

              <div className="flex gap-2">
                <span>Delivery</span><span className="text-green-600">Free</span>
              </div>


              <div className="flex text-lg font-bold">
                <h2>Total: ₹{total}</h2>
              </div>

            </div>
          <div>
          <button
            className="w-35 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={() => handleBuyNow(user, navigate)}
            >
            Place Order
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}