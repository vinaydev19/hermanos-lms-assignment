import { useState } from "react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";
import imagePlaceholder from "@/assets/placeholder.svg";
import { useGetCoursesQuery, useDeleteCourseMutation } from "@/store/api/courseApiSlice";
import AddEditDialog from "@/components/courses/addEditDialog";
import toast from "react-hot-toast";

const Courses = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { data, isLoading } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  const courses = data?.data?.courses || [];

  const openAdd = () => {
    setDialogMode("add");
    setSelectedCourse(null);
    setIsDialogOpen(true);
  };

  const openEdit = (course) => {
    setDialogMode("edit");
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id).unwrap();
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete course");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Courses</h1>
          <p className="text-[#6B7280]">Manage your courses</p>
        </div>

        <Button
          onClick={openAdd}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
        >
          + Add Course
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={{
              id: course._id,
              name: course.name,
              level: course.level,
              description: course.description,
              image: course.image || imagePlaceholder
            }}
            onEdit={() => openEdit(course)}
            onDelete={() => handleDelete(course._id)}
          />
        ))}
      </div>

      {/* Dialog */}
      <AddEditDialog
        open={isDialogOpen}
        mode={dialogMode}
        course={selectedCourse}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Courses;
