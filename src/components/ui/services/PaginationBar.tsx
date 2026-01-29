import { Button } from "@/components/ui/button";

const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="hidden sm:flex"
      >
        ← Previous
      </Button>

      {start > 1 && (
        <>
          <Button variant="outline" onClick={() => onPageChange(1)}>
            1
          </Button>
          {start > 2 && <span className="px-1 text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((p) => (
        <Button
          key={p}
          variant={currentPage === p ? "default" : "outline"}
          className={currentPage === p ? "bg-primary text-white" : ""}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-muted-foreground">...</span>}
          <Button variant="outline" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="hidden sm:flex"
      >
        Next →
      </Button>
    </div>
  );
};

export default PaginationBar;
