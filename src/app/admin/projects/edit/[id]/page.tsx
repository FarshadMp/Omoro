"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { getItem, setItem } from "@/utils/storage";

export default function EditProjectPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "Residential",
    description: "",
    year: "",
    client: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      setDataLoading(true);
      try {
        const id = parseInt(params.id);
        setProjectId(id);

        let allProjects = await getItem<any[]>("projects_full_list");
        if (!allProjects) {
          const localProjects = await getItem<any[]>("local_projects");
          if (localProjects) {
            allProjects = [...localProjects];
          } else {
            allProjects = [];
          }

          // Should import static as backup
          const { projects: initialProjects } = await import("@/data/projects");
          if (!allProjects || allProjects.length === 0) {
            allProjects = initialProjects;
          } else {
            allProjects = [...allProjects, ...initialProjects];
            // Remove duplicates by ID if any
            allProjects = Array.from(
              new Map(allProjects.map((item) => [item.id, item])).values(),
            );
          }
        }

        const project = allProjects.find((p: any) => p.id === id);

        if (project) {
          setFormData({
            title: project.title || "",
            location: project.location || "",
            category: project.category || "Residential",
            description: project.description || "",
            year: project.year || "",
            client: project.client || "",
          });

          if (project.images && Array.isArray(project.images)) {
            setImages(project.images);
          } else if (project.image) {
            setImages([project.image]);
          }
        } else {
          alert("Project not found");
          router.push("/admin/projects");
        }
      } catch (error) {
        console.error("Failed to load project", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (params.id) {
      loadProject();
    }
  }, [params.id, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newImages.push(base64);
      }

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const categories = [
    { value: "Residential", label: "Residential" },
    { value: "Commercial", label: "Commercial" },
    { value: "Industrial", label: "Industrial" },
    { value: "Outdoor", label: "Outdoor" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedProject = {
      id: projectId,
      slug: formData.title.toLowerCase().replace(/ /g, "-") + "-project",
      image: images[0] || "/img/fallback.jpg",
      images: images,
      ...formData,
    };

    try {
      let fullList = await getItem<any[]>("projects_full_list");

      if (!fullList) {
        const { projects: initialProjects } = await import("@/data/projects");
        const localProjects = (await getItem<any[]>("local_projects")) || [];
        const merged = [...localProjects, ...initialProjects];
        fullList = Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );
      }

      const index = fullList.findIndex((p: any) => p.id === projectId);
      if (index !== -1) {
        fullList[index] = { ...fullList[index], ...updatedProject };
      }

      await setItem("projects_full_list", fullList);

      // Update local_projects if exists for consistency
      const localProjects = await getItem<any[]>("local_projects");
      if (localProjects) {
        const localIndex = localProjects.findIndex((p) => p.id === projectId);
        if (localIndex !== -1) {
          localProjects[localIndex] = {
            ...localProjects[localIndex],
            ...updatedProject,
          };
          await setItem("local_projects", localProjects);
        }
      }

      console.log("Project Data Updated:", updatedProject);
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/admin/projects");
      }, 1000);
    } catch (error) {
      console.error("Failed to update project", error);
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#04AFE2]" size={40} />
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        <p className="text-gray-500 mt-2">Update project details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Project Images
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group"
                  >
                    <img
                      src={img}
                      alt={`Project ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50/50 hover:border-[#04AFE2]/50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#04AFE2]" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Right Column - Form Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">
                Project Details
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Villa Lighting"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="e.g. Mr. John Doe"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#04AFE2] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#16a08c] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#04AFE2]/20"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Saving...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={20} /> Saved Successfully
                  </>
                ) : (
                  "Update Project"
                )}
              </button>
              <Link
                href="/admin/projects"
                className="px-6 py-3 rounded-xl font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
