import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    useCreateInstructorMutation,
    useUpdateInstructorMutation
} from "@/store/api/instructorApiSlice";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AddEditDialog = ({ open, onClose, mode = "add", instructor }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [createInstructor] = useCreateInstructorMutation();
    const [updateInstructor] = useUpdateInstructorMutation();

    // fill form when editing
    useEffect(() => {
        if (mode === "edit" && instructor) {
            setForm({
                name: instructor.name,
                email: instructor.email,
                password: "",
            });
        } else {
            setForm({ name: "", email: "", password: "" });
        }
    }, [mode, instructor]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "add") {
                const res = await createInstructor(form).unwrap();
                toast.success("Instructor added!");
            } else {
                const res = await updateInstructor({
                    instructorId: instructor._id,
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }).unwrap();
                toast.success("Instructor updated!");
            }

            onClose(); // close dialog
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white border border-[#E5E7EB] shadow-lg">

                <DialogHeader>
                    <DialogTitle className="text-[#1F2937]">
                        {mode === "add" ? "Add Instructor" : "Edit Instructor"}
                    </DialogTitle>

                    <DialogDescription className="text-[#6B7280]">
                        {mode === "add"
                            ? "Add a new instructor to the system"
                            : "Update instructor information"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <Label>Name</Label>
                        <Input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter name"
                            className="focus:ring-[#3B82F6] mt-2"
                        />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Enter email"
                            className="focus:ring-[#3B82F6] mt-2"
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Enter password"
                            className="focus:ring-[#3B82F6] mt-2"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="hover:cursor-pointer hover:bg-gray-200"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-[#3B82F6] hover:bg-[#2563EB] hover:cursor-pointer text-white"
                        >
                            {mode === "add" ? "Add" : "Update"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditDialog;
