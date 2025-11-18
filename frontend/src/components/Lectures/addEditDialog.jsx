import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useGetCoursesQuery } from "@/store/api/courseApiSlice";
import { useGetInstructorsQuery } from "@/store/api/instructorApiSlice";
import { useCreateLectureMutation, useUpdateLectureMutation } from "@/store/api/lectureApiSlice";
import toast from "react-hot-toast";

const AddEditDialog = ({ open, onClose, mode, lecture }) => {
    const { data: courseData } = useGetCoursesQuery();
    const { data: instructorData } = useGetInstructorsQuery();

    const [createLecture] = useCreateLectureMutation();
    const [updateLecture] = useUpdateLectureMutation();

    const courses = courseData?.data?.courses || [];
    const instructors = instructorData?.data?.instructors || [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            course: e.target.course.value,
            instructor: e.target.instructor.value,
            date: e.target.date.value,
        };

        try {
            if (mode === "add") {
                await createLecture(body).unwrap();
                toast.success("Lecture created successfully");
            } else {
                await updateLecture({ id: lecture._id, ...body }).unwrap();
                toast.success("Lecture updated successfully");
            }
            onClose();
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white border border-[#E5E7EB] shadow-lg">

                <DialogHeader>
                    <DialogTitle className="text-[#1F2937]">
                        {mode === "add" ? "Add Lecture" : "Edit Lecture"}
                    </DialogTitle>
                    <DialogDescription className="text-[#6B7280]">
                        {mode === "add" ? "Schedule a new lecture" : "Update lecture information"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <Label>Course</Label>
                        <Select name="course" defaultValue={lecture?.course?._id}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((c) => (
                                    <SelectItem key={c._id} value={c._id}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Instructor</Label>
                        <Select name="instructor" defaultValue={lecture?.instructor?._id}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select instructor" />
                            </SelectTrigger>
                            <SelectContent>
                                {instructors.map((i) => (
                                    <SelectItem key={i._id} value={i._id}>
                                        {i.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Date</Label>
                        <Input
                            type="date"
                            name="date"
                            defaultValue={lecture?.date?.substring(0, 10)}
                            className="mt-2"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>

                        <Button className="bg-[#3B82F6] text-white">
                            {mode === "add" ? "Add" : "Update"}
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
};

export default AddEditDialog;
