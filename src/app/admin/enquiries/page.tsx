"use client";

import React, { useEffect, useState } from "react";
import { getEnquiries, deleteEnquiry, Enquiry } from "@/services/db";
import { Trash2, Mail, Phone, MapPin, Calendar, Search } from "lucide-react";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      await deleteEnquiry(id);
      fetchEnquiries();
    }
  };

  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone.includes(searchTerm),
  );

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Enquiries</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(enquiry.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 pl-6">
                        {new Date(enquiry.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {enquiry.phone}
                      </div>
                      {enquiry.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {enquiry.email}
                        </div>
                      )}
                      {enquiry.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {enquiry.location}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {enquiry.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {enquiry.productName && (
                        <div className="font-medium text-gray-800 mb-1">
                          Product: {enquiry.productName} ({enquiry.modelNumber})
                        </div>
                      )}
                      {enquiry.message && (
                        <p className="line-clamp-2" title={enquiry.message}>
                          {enquiry.message}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => enquiry.id && handleDelete(enquiry.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No enquiries found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {enquiry.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(enquiry.date).toLocaleDateString()}{" "}
                        {new Date(enquiry.date).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {enquiry.type}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {enquiry.phone}
                    </div>
                    {enquiry.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{enquiry.email}</span>
                      </div>
                    )}
                    {enquiry.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {enquiry.location}
                      </div>
                    )}
                  </div>

                  {(enquiry.productName || enquiry.message) && (
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      {enquiry.productName && (
                        <div className="font-medium text-gray-800 mb-1">
                          Product: {enquiry.productName} ({enquiry.modelNumber})
                        </div>
                      )}
                      {enquiry.message && <p>{enquiry.message}</p>}
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => enquiry.id && handleDelete(enquiry.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Enquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
