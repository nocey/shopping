import { IProduct } from "@/types/products/detail";
import AddedCards from "./components/addedCards";
import Product from "./components/product";
import { permittedFilters, useProducts } from "./hooks/useProducts";
import { Pagination } from "@mui/material";
import FilterScope from "./components/filterScope";
import React from "react";

function ProductList() {
  const { products, page, handlePage, allFilters, handleFilter, filters } =
    useProducts();
  return (
    <div className="grid grid-cols-12 gap-4" data-testid="product-list">
      <div className="lg:col-span-2 col-span-12">
        <div className="w-full flex flex-col gap-4">
          {allFilters &&
            Object.keys(allFilters).map(
              (filter, index) =>
                allFilters[filter as keyof IProduct] && (
                  <React.Fragment key={index}>
                    {permittedFilters[filter as keyof IProduct]?.header}
                    <FilterScope
                      handleFilter={handleFilter}
                      filters={filters}
                      allFilters={allFilters}
                      filter={filter as keyof IProduct}
                    />
                  </React.Fragment>
                )
            )}
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-9 lg:grid-cols-12 col-span-12 md:col-span-12 lg:col-span-8 gap-4">
        {products.slice((page - 1) * 12, page * 12).map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
      <div className="col-span-12 lg:col-span-2">
        <AddedCards />
      </div>
      <div className="col-end-auto col-span-12 lg:col-span-10 flex justify-end">
        <Pagination
          className="flex justify-end"
          count={Math.round(products.length / 12)}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}

export default ProductList;
