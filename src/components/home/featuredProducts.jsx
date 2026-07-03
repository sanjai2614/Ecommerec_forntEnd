import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProductCard from '../productCard'
import { useProducts } from '../../hooks/useProducts'
import Skeleton from '../skeleton'

export default function FeaturedProducts() {

  const {data,isLoading,error}=useProducts()

  if(isLoading) return <Skeleton/>
  if(error) return <Skeleton/>


  return (
  <div>
    {/* Heading */}

    <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Hurry up! Special offers.
      </h1>

      <Link to="/products" className="text-lg sm:text-xl font-semibold text-green-600 hover:underline">
        View all <i className="ri-arrow-right-line"></i>
      </Link>
    </div>

    {isLoading || error ? (
      <Skeleton />
    ) : (
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data
          .filter((p) => p.rating === "⭐⭐⭐⭐⭐")
          .slice(0, 4)
          .map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
      </div>
    )}
  </div>
);
}
