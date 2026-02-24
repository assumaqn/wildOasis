import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
function SortBy({ options }) {
  const [searchPrams, setSearchPrams] = useSearchParams();

  function handleSelect(e) {
    searchPrams.set("sortby", e.target.value);
    setSearchPrams(searchPrams);
  }

  return <Select options={options} onChange={handleSelect} type="white" />;
}

SortBy.propTypes = {
  options: PropTypes.array,
};
export default SortBy;
