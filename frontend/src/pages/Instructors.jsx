import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";

import AddEditDialog from "@/components/Instructors/addEditDialog";

import {
  useGetInstructorsQuery,
  useDeleteInstructorMutation,
} from "@/store/api/instructorApiSlice";

import toast from "react-hot-toast";

const Instructors = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [currentInstructor, setCurrentInstructor] = useState(null);

  const { data, isLoading } = useGetInstructorsQuery();
  const [deleteInstructor] = useDeleteInstructorMutation();

  const instructors = data?.data?.instructors || [];

  const openAdd = () => {
    setDialogMode("add");
    setCurrentInstructor(null);
    setIsDialogOpen(true);
  };

  const openEdit = (inst) => {
    setDialogMode("edit");
    setCurrentInstructor(inst);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInstructor(id).unwrap();
      toast.success("Instructor deleted!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Instructors</h1>
          <p className="text-[#6B7280]">Manage your instructors</p>
        </div>

        <Button
          onClick={openAdd}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-[#E2E8F0] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1F2937]">All Instructors</CardTitle>
          <CardDescription className="text-[#6B7280]">
            A list of all instructors
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {instructors.map((inst) => (
                  <TableRow key={inst._id} className="hover:bg-[#F1F5F9]">
                    <TableCell className="font-medium">{inst.name}</TableCell>
                    <TableCell>{inst.email}</TableCell>

                    <TableCell className="text-right space-x-2">

                      {/* EDIT */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#1F2937] hover:bg-[#E5E7EB]"
                        onClick={() => openEdit(inst)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      {/* DELETE */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#1F2937] hover:bg-[#E5E7EB]"
                        onClick={() => handleDelete(inst._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <AddEditDialog
        open={isDialogOpen}
        mode={dialogMode}
        instructor={currentInstructor}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Instructors;
