import { LoaderArgs, LoaderFunction, defer, json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import { Product } from "~/types/productPage";
import QuickViewLayout from "~/layouts/QuickViewLayout";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const productId = params.productId;

  const product = await axios.get(
    "http://fakestoreapi.com/products/" + productId
  );

  return defer({ product: product.data });
};

const QuickView = () => {
  const {
    product,
  }: {
    product: Product;
  } = useLoaderData<typeof loader>();

  return (
    <div className="py-5 bg-red-100 h-screen">
      <QuickViewLayout>
        <div className="flex flex-col justify-center items-center">
          <img src={product.image} width={200} height={200} />

          <div className="py-5 px-3">
            <h1 className="text-2xl">{product.title}</h1>
            <p className="text-base ">{product.description}</p>

            <p className="text-base ">{product.price}</p>

            <div className="py-2">
              <Link to={`/products/${product.id}`} className="primaryButton">
                View details
              </Link>
            </div>
          </div>
        </div>
      </QuickViewLayout>
    </div>
  );
};

export default QuickView;

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
        <h1>Errors pd </h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
