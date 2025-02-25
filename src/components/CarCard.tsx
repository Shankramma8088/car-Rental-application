
import { Car } from "@/types/car";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
}

export const CarCard = ({ car, onEdit, onDelete }: CarCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg slide-up">
      <CardContent className="p-0">
        <img
          src={car.imageUrl || "/placeholder.svg"}
          alt={`${car.make} ${car.model}`}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-slate-600">Year: {car.year}</p>
          <p className="mt-2 text-lg font-medium">${car.price}/day</p>
          <span className={`inline-block px-2 py-1 text-sm rounded-full mt-2 ${car.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {car.available ? 'Available' : 'Rented'}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(car)}
          className="hover:bg-slate-100"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(car)}
          className="hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
