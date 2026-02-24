import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          { value: "all", name: "All" },
          { value: "no-discount", name: "No Discount" },
          { value: "with-discount", name: "With Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
