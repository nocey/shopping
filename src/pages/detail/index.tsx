import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardSet, selectCard } from "@/redux/slices/card";
import { Callback } from "@/types/api";
import { IProduct } from "@/types/products/detail";
import { getProduct } from "@api/products/detail";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import AddedCards from "@pages/list/components/addedCards";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const card = useAppSelector(selectCard);
  const dispatch = useAppDispatch();
  const callback: Callback<IProduct> = (data, status) => {
    if (status === 200) {
      setProduct(data);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(callback, id);
    }
  }, [id]);

  const addToCard = () => {
    if (product) {
      dispatch(
        CardSet({
          ...card,
          [product.id]: [...(card[product.id] ?? []), product],
        })
      );
    }
  };

  return (
    product && (
      <div className="grid grid-cols-12" data-testid={`product-${id}`}>
        <div className="col-span-10">
          <div>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/">
                Products
              </Link>
              <Typography color="text.primary">{product?.name}</Typography>
            </Breadcrumbs>
          </div>
          <div className="w-full grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <img src={product.image} className="w-full" />
            </div>
            <div className="col-span-6 flex flex-col gap-4">
              <Typography variant="h2" className="text-start">
                {product.name}
              </Typography>
              <Typography
                data-testid={`brand`}
                variant="subtitle1"
                color="gray"
              >
                <b>Brand : </b>&nbsp;{product.brand}
              </Typography>
              <Typography
                data-testid={`model`}
                variant="subtitle1"
                color="gray"
              >
                <b>Model : </b>&nbsp;{product.model}
              </Typography>
              <Typography
                data-testid={`price`}
                variant="h5"
                className="text-primary"
              >
                <b>Price : </b>&nbsp;{product.price} ₺
              </Typography>
              <Button
                className="w-full"
                variant="outlined"
                data-testid={`add-coad-${product.name}`}
                onClick={addToCard}
              >
                Add to Cart
              </Button>
              <Typography variant="h5" className="flex flex-col">
                <b>Description : </b>&nbsp;{product.description} ₺
              </Typography>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <AddedCards />
        </div>
      </div>
    )
  );
}

export default ProductDetail;
