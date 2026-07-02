import { useWishlist, useRemoveWishlist } from "../hooks/useWishlist";
import { useAuth } from "../context/authContext";
import {useNavigate} from 'react-router-dom'

export default function Wishlist() {

  const navigate=useNavigate()

  const { user, isLoading: authLoading } = useAuth();

  const userId = user?._id;

  const { data, isLoading, error } = useWishlist();
  const { mutate: removeWishlist } = useRemoveWishlist();

  if (authLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Please Login</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center flex flex-col justify-center items-center min-h-dvh bg-[#dcfff9]">
      <h1>No wishlist items ❤️</h1>
      <p className="text-gray-500 mt-2">
                Add some products to your wishlist.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Continue Shopping
              </button>
      </div>;
  }

  return (
    <div className="p-6 bg-[#dcfff9] min-h-dvh">

      <h1 className="text-3xl font-bold mb-6">❤️ Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow">

            <img
              src={item.productId?.image}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-semibold mt-2">
              {item.productId?.name}
            </h2>

            <p>₹{item.productId?.price}</p>

            <button
              onClick={() =>removeWishlist(item.productId?._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}