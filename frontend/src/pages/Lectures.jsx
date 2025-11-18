import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AddEditDialog from "@/components/Lectures/addEditDialog";
import { useGetLecturesQuery, useDeleteLectureMutation } from "@/store/api/lectureApiSlice";
import toast from "react-hot-toast";

const Lectures = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedLecture, setSelectedLecture] = useState(null);

  const { data, isLoading } = useGetLecturesQuery();
  const [deleteLecture] = useDeleteLectureMutation();

  const lectures = data?.data?.lectures || [];

  const openAdd = () => {
    setDialogMode("add");
    setSelectedLecture(null);
    setIsDialogOpen(true);
  };

  const openEdit = (lecture) => {
    setDialogMode("edit");
    setSelectedLecture(lecture);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLecture(id).unwrap();
      toast.success("Lecture deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete lecture");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Lectures</h1>
          <p className="text-[#6B7280]">Manage all lectures</p>
        </div>

        <Button
          onClick={openAdd}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lecture
        </Button>
      </div>

      <Card className="border border-[#E2E8F0] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1F2937]">All Lectures</CardTitle>
          <CardDescription className="text-[#6B7280]">
            A list of all scheduled lectures
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-[#F8FAFC]">
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lectures.map((lec) => (
                <TableRow key={lec._id} className="hover:bg-[#F1F5F9]">
                  <TableCell className="font-medium">{lec.course?.name}</TableCell>
                  <TableCell>{lec.instructor?.name}</TableCell>
                  <TableCell>{lec.date?.substring(0, 10)}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(lec)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(lec._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

      <AddEditDialog
        open={isDialogOpen}
        mode={dialogMode}
        lecture={selectedLecture}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Lectures;
