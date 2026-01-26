import { Button } from "@/components/ui/button";

const PaginationBar = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button variant="outline" disabled>
        ← Previous
      </Button>
      <Button className="bg-primary text-white">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <span className="px-2">...</span>
      <Button variant="outline">8</Button>
      <Button variant="outline">Next →</Button>
    </div>
  );
};

export default PaginationBar;
