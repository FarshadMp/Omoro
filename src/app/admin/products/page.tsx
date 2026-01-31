"use client";

import React, { useState } from "react";
import { products as initialProducts } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  MoreVertical,
  Eye,
  Filter,
} from "lucide-react";
import { getItem, setItem } from "@/utils/storage";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // In a real app, products would come from an API/Context
  const [products, setProducts] = useState(initialProducts);

  React.useEffect(() => {
    const loadData = async () => {
      // Check for a full override list first (supports deletions of default items)
      const fullList = await getItem<any[]>("products_full_list");
      if (fullList) {
        setProducts(fullList);
        return;
      }

      // Fallback: merge local additions with initial (only if no full list exists yet)
      const localProducts = await getItem<any[]>("local_products");
      if (localProducts) {
        setProducts([...localProducts, ...initialProducts]);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      await setItem("products_full_list", updatedProducts);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center justify-center gap-2 bg-[#04AFE2] hover:bg-[#039bc9] text-white px-5 py-2.5 rounded-full font-medium transition-colors"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={18} /> <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price (MRP)
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#04AFE2] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-700">
                        Model: {product.modelNumber}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 w-fit px-2 py-0.5 rounded-full capitalize">
                        {product.category.replace("-", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      ₹{product.mrp}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      In Stock
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-[#04AFE2] hover:bg-[#04AFE2]/10 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No products found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate pr-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                  {product.modelNumber && (
                    <span className="text-xs text-gray-400">
                      #{product.modelNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-gray-900">
                    ₹{product.mrp}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 text-gray-400 hover:text-[#04AFE2] bg-gray-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="p-1.5 text-gray-400 hover:text-orange-500 bg-gray-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No products found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing 1 to {filteredProducts.length} of {filteredProducts.length}{" "}
            entries
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
