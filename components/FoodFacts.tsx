import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sun } from "lucide-react";

const FoodFacts = () => {
  return (
    <div className="px-4 w-full flex pt-14 justify-center items-center">
      <Alert className="max-w-2xl">
        <Sun className="h-4 w-4 text-yellow-400" />
        <AlertTitle>Hello there!</AlertTitle>
        <AlertDescription>
          Save money and reduce waste in by using up what you already have on
          hand.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FoodFacts;
