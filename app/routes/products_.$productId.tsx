import { LoaderFunction, defer } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import { Product } from "~/types/productPage";

export const loader: LoaderFunction = async ({ params }) => {
  const productId = params.productId;
  const product = await axios.get(
    "http://fakestoreapi.com/products/" + productId
  );

  return defer({ product: product.data });
};

const ProductDetails = () => {
  const {
    product,
  }: {
    product: Product;
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="container grid grid-cols-6 space-x-3 py-10">
        <div className="col-span-3">
          <img
            height="300"
            width="300"
            src={product?.image}
            alt={product?.title}
          />
        </div>

        <div className="col-span-3">
          <h1 className="text-2xl font-semibold">{product?.title}</h1>
          <p className="py-3">{product?.description}</p>
          <div className="py-2">
            <h1 className="text-xl font-semibold">Price: {product?.price}</h1>
          </div>
          <div className="py-2">
            <button className="primaryButton">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Errors k</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
