import { IProduct } from "@/types/products/detail";
import React, { useEffect, useState } from "react";
import { Filter } from "../hooks/useProducts";
import { Checkbox } from "@mui/material";

type Props = {
  allFilters?: Filter;
  filters: Filter;
  filter: keyof IProduct;
  handleFilter: (filter: string, filterType: string) => void;
};

function FilterScope({ allFilters, filter, filters, handleFilter }: Props) {
  return (
    allFilters && (
      <div className="flex flex-col gap-2 shadow-lg h-56 overflow-scroll">
        {(allFilters[filter] ?? []).map((value, index) => (
          <CustomCheckbox
            handleFilter={handleFilter}
            filters={filters}
            key={index}
            value={value}
            filter={filter}
          />
        ))}
      </div>
    )
  );
}

type CheckboxProps = {
  handleFilter: (filter: string, filterType: string) => void;
  filters: Filter;
  value: string;
  filter: keyof IProduct;
};

const CustomCheckbox = ({
  handleFilter,
  value,
  filters,
  filter,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(
    filters[filter]?.includes(value) !== undefined
      ? filters[filter]?.includes(value)
      : false
  );
  const handleClick = (value: string) => {
    handleFilter(value, filter);
  };

  useEffect(() => {
    setChecked(filters[filter]?.includes(value));
  }, [filters]);

  return (
    <div
      className="flex items-center cursor-pointer hover:bg-slate-400/20"
      onClick={() => handleClick(value)}
      data-testid={value}
    >
      <Checkbox checked={checked ?? false} />
      <p>{value}</p>
    </div>
  );
};

export default FilterScope;
