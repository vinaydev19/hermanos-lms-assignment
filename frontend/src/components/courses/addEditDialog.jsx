import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateCourseMutation, useUpdateCourseMutation } from "@/store/api/courseApiSlice";
import toast from "react-hot-toast";

const AddEditDialog = ({ open, onClose, mode, course }) => {
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (mode === "add") {
        await createCourse(formData).unwrap();
        toast.success("Course created successfully");
      } else {
        await updateCourse({ id: course._id, formData }).unwrap();
        toast.success("Course updated successfully");
      }

      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border border-[#E5E7EB] shadow-xl">

        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Course" : "Edit Course"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Add a new course" : "Update course details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Course Name</Label>
            <Input
              name="name"
              defaultValue={course?.name}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label>Level</Label>
            <Select name="level" defaultValue={course?.level || "beginner"}>
              <SelectTrigger className="mt-2 bg-white">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              defaultValue={course?.description}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Course Image</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              className="mt-2"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" className="bg-[#3B82F6] text-white">
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
};

export default AddEditDialog;
