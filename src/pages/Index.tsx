import { useState } from "react";
import { Car } from "@/types/car";
import { CarCard } from "@/components/CarCard";
import { CarForm } from "@/components/CarForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: "1",
      make: "Toyota",
      model: "Corolla",
      year: 2023,
      price: 45,
      available: true,
      imageUrl: "/lovable-uploads/242f0fea-e9b7-4ab1-a93b-58b7db4a21bf.png"
    },
    {
      id: "2",
      make: "BMW",
      model: "Vision M NEXT",
      year: 2024,
      price: 150,
      available: true,
      imageUrl: "/lovable-uploads/986a441c-0f75-46f5-869f-bdbb7467bced.png"
    },
    {
      id: "3",
      make: "Suzuki",
      model: "Swift",
      year: 2024,
      price: 35,
      available: true,
      imageUrl: "/lovable-uploads/88b07cf2-c867-461e-993a-b9217260e4ef.png"
    }
  ]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deletingCar, setDeletingCar] = useState<Car | null>(null);
  const { toast } = useToast();

  const handleAddCar = (carData: Omit<Car, "id">) => {
    const newCar: Car = {
      ...carData,
      id: crypto.randomUUID(),
    };
    setCars([...cars, newCar]);
    toast({
      title: "Car Added",
      description: `${newCar.make} ${newCar.model} has been added to the fleet.`,
    });
  };

  const handleUpdateCar = (carData: Omit<Car, "id">) => {
    if (!editingCar) return;
    const updatedCars = cars.map((car) =>
      car.id === editingCar.id ? { ...carData, id: car.id } : car
    );
    setCars(updatedCars);
    setEditingCar(null);
    toast({
      title: "Car Updated",
      description: `${carData.make} ${carData.model} has been updated.`,
    });
  };

  const handleDeleteCar = () => {
    if (!deletingCar) return;
    setCars(cars.filter((car) => car.id !== deletingCar.id));
    setDeletingCar(null);
    toast({
      title: "Car Deleted",
      description: `${deletingCar.make} ${deletingCar.model} has been removed from the fleet.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Car Rental System</h1>
        <Button onClick={() => setIsAddingCar(true)} className="hover:bg-slate-800">
          <Plus className="h-4 w-4 mr-1" />
          Add Car
        </Button>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No cars available. Add your first car to the fleet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={setEditingCar}
              onDelete={setDeletingCar}
            />
          ))}
        </div>
      )}

      <CarForm
        open={isAddingCar}
        onClose={() => setIsAddingCar(false)}
        onSubmit={handleAddCar}
      />

      <CarForm
        car={editingCar || undefined}
        open={!!editingCar}
        onClose={() => setEditingCar(null)}
        onSubmit={handleUpdateCar}
      />

      <AlertDialog open={!!deletingCar} onOpenChange={() => setDeletingCar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the car
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCar}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
