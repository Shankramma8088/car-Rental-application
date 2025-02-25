
import { Car } from "@/types/car";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CarFormProps {
  car?: Car;
  open: boolean;
  onClose: () => void;
  onSubmit: (car: Omit<Car, "id">) => void;
}

export const CarForm = ({ car, open, onClose, onSubmit }: CarFormProps) => {
  const [formData, setFormData] = useState<Omit<Car, "id">>({
    make: car?.make || "",
    model: car?.model || "",
    year: car?.year || new Date().getFullYear(),
    price: car?.price || 0,
    available: car?.available ?? true,
    imageUrl: car?.imageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{car ? "Edit Car" : "Add New Car"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="make">Make</Label>
            <Input
              required
              id="make"
              value={formData.make}
              onChange={(e) =>
                setFormData({ ...formData, make: e.target.value })
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="model">Model</Label>
            <Input
              required
              id="model"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="year">Year</Label>
            <Input
              required
              type="number"
              id="year"
              min={1900}
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="price">Price per Day ($)</Label>
            <Input
              required
              type="number"
              id="price"
              min={0}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, available: checked })
              }
            />
            <Label htmlFor="available">Available for Rent</Label>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {car ? "Update Car" : "Add Car"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
