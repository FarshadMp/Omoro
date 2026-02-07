"use client";

import React, { useState } from "react";
import { projects as initialProjects } from "@/data/projects";
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

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<any[]>(initialProjects);

  React.useEffect(() => {
    const loadData = async () => {
      // Check for a full override list first (supports deletions of default items)
      const fullList = await getItem<any[]>("projects_full_list");
      if (fullList) {
        setProjects(fullList);
        return;
      }

      // Fallback: merge local additions with initial
      const localProjects = await getItem<any[]>("local_projects");
      if (localProjects) {
        setProjects([...localProjects, ...initialProjects]);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);
      await setItem("projects_full_list", updatedProjects);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-500 text-sm">
            Manage your completed projects
          </p>
        </div>
        <Link
          href="/admin/projects/add"
          className="flex items-center justify-center gap-2 bg-[#04AFE2] hover:bg-[#16a08c] text-white px-5 py-2.5 rounded-full font-medium transition-colors"
        >
          <Plus size={18} /> Add Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
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
                  Project
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#04AFE2] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">
                      {project.location}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {project.category}
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
                        href={`/admin/projects/edit/${project.id}`}
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    No projects found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredProjects.map((project) => (
            <div key={project.id} className="p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 truncate pr-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {project.location}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full capitalize truncate max-w-[100px]">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 text-gray-400 hover:text-[#04AFE2] bg-gray-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="p-1.5 text-gray-400 hover:text-orange-500 bg-gray-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
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

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No projects found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
