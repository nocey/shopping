import { useAppSelector } from "@/redux/hooks";
import { selectSearch } from "@/redux/slices/search";
import { Callback } from "@/types/api";
import { IProducts } from "@/types/products";
import { IProduct } from "@/types/products/detail";
import { getProducts } from "@api/products";
import { useEffect, useState } from "react";

export type Filter = {
  [key in keyof IProduct]?: Array<string>;
};

type PermittedFilters = {
  [key in keyof IProduct]?: {
    header: string;
    type: "price" | "search";
  };
};

export const permittedFilters: PermittedFilters = {
  brand: {
    header: "Brand",
    type: "search",
  },
  name: {
    header: "Name",
    type: "search",
  },
  model: {
    header: "model",
    type: "search",
  },
};

export const useProducts = () => {
  const [initialProducts, setInitialProducts] = useState<IProducts>([]);
  const [products, setProducts] = useState<IProducts>([]);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filter>({});
  const [allFilters, setAllFilters] = useState<Filter>();
  const search = useAppSelector(selectSearch);
  const handleProducts: Callback<IProducts> = (data, status) => {
    if (status === 200) {
      setProducts(data);
      setInitialProducts(data);
    }
  };

  const filterHandle = async () => {
    if (
      search !== "" ||
      (filters &&
        Object.keys(filters).filter(
          (filter) => (filters[filter as keyof IProduct] ?? []).length > 0
        ).length > 0)
    ) {
      const filteredProducts: IProducts = [];
      for (const product of initialProducts) {
        if (
          search !== "" &&
          product["name"].toLowerCase().includes(search.toLowerCase())
        ) {
          filteredProducts.push(product);
        } else {
          for (const key in filters) {
            if (filters[key as keyof IProduct] !== undefined) {
              for (const filter of filters[key as keyof IProduct] ?? []) {
                if (product[key as keyof IProduct].includes(filter)) {
                  filteredProducts.push(product);
                }
              }
            }
          }
        }
      }
      setProducts([...filteredProducts]);
    } else {
      setProducts([...initialProducts]);
    }
  };

  useEffect(() => {
    if (initialProducts.length > 0) {
      let tempFilters: Filter = filters;
      for (const key in permittedFilters) {
        for (const product of initialProducts) {
          if (
            !(tempFilters[key as keyof IProduct] ?? []).includes(
              product[key as keyof IProduct]
            )
          ) {
            tempFilters = {
              ...tempFilters,
              [key]: [
                ...(tempFilters[key as keyof IProduct] ?? []),
                product[key as keyof IProduct],
              ],
            };
          }
        }
      }
      setAllFilters({ ...tempFilters });
    }
  }, [initialProducts]);

  useEffect(() => {
    filterHandle();
  }, [filters, search]);

  const handleFilter = (filter: string, filterType: string) => {
    if (filters[filterType as keyof IProduct] !== undefined) {
      if (filters[filterType as keyof IProduct]?.includes(filter)) {
        filters[filterType as keyof IProduct] = filters[
          filterType as keyof IProduct
        ]?.filter((value) => value !== filter);
      } else {
        filters[filterType as keyof IProduct]?.push(filter);
      }
    } else {
      filters[filterType as keyof IProduct] = [filter];
    }
    setFilters({ ...filters });
  };

  const handlePage: (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => void = (_e, page) => {
    setPage(page);
  };

  useEffect(() => {
    getProducts(handleProducts);
  }, []);

  return {
    products,
    page,
    filters,
    handlePage,
    handleFilter,
    allFilters,
  };
};
