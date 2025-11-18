// CourseCard.jsx
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const CourseCard = ({ course, onEdit, onDelete }) => {
    return (
        <Card className="border border-[#E2E8F0] shadow-sm">
            <CardHeader>
                <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                />

                <CardTitle className="text-[#1F2937]">{course.name}</CardTitle>
                <CardDescription className="capitalize text-[#6B7280]">
                    {course.level}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-[#6B7280] mb-4">
                    {course.description}
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                        className="text-[#1F2937] hover:bg-[#E5E7EB]"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDelete}
                        className="text-[#B91C1C] hover:bg-[#FEE2E2]"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
