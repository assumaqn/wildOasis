import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/ApiCabin";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://gsahaorpnzaaxrexgafm.supabase.co/storage/v1/object/public/Cabin-images/cabin-002.jpg"
        alt="some image"
      />
    </Row>
  );
}

export default Cabins;
