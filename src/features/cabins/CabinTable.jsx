import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabinApi } from "./useCabinApi";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabinApi();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const filterValue = searchParams.get("discount") || "all";
  let filterCabin;

  if (filterValue === "all") filterCabin = cabins;
  if (filterValue === "no-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount == 0);
  if (filterValue === "with-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);

  //2. SortCabins
  const SortBy = searchParams.get("sortby") || "startDate";
  const [field, direction] = SortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortCabins = filterCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filterCabin}
          // data={cabins}
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
