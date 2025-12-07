
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

interface AddApplianceDialogProps {
  onAddAppliance: (newAppliance: {
    name: string;
    wattage: string;
    hours: string;
  }) => void;
  newAppliance: {
    name: string;
    wattage: string;
    hours: string;
  };
  setNewAppliance: React.Dispatch<React.SetStateAction<{
    name: string;
    wattage: string;
    hours: string;
  }>>;
}

const AddApplianceDialog: React.FC<AddApplianceDialogProps> = ({ 
  onAddAppliance, 
  newAppliance, 
  setNewAppliance 
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppliance(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAppliance(newAppliance);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Appliance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Appliance</DialogTitle>
          <DialogDescription>
            Enter the details of your appliance to calculate its energy consumption.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newAppliance.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Microwave"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wattage" className="text-right">
                Wattage
              </Label>
              <Input
                id="wattage"
                name="wattage"
                type="number"
                value={newAppliance.wattage}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., 1200"
                min="1"
                step="1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours" className="text-right">
                Hours/day
              </Label>
              <Input
                id="hours"
                name="hours"
                type="number"
                value={newAppliance.hours}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., 2"
                min="0.1"
                max="24"
                step="0.1"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Appliance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplianceDialog;
