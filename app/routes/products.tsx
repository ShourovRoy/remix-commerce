import { LoaderFunction, V2_MetaFunction, defer } from "@remix-run/node";
import {
  Await,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";

import axios from "axios";

import { Suspense } from "react";
import { ProductCard } from "~/components/products/ProductCard";
import { Product } from "~/types/productPage";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Lokafly - All products" }];
};

const fetchProducts = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          axios
            .get("http://fakestoreapi.com/products")
            .then((data) => data.data)
        ),
      0
    )
  );

export const loader: LoaderFunction = async () => {
  const [products] = await Promise.all([fetchProducts() as Promise<Product[]>]);

  // I have commented this because it is doing the exactly same thing as the above code

  // const products = await axios
  //   .get("http://fakestoreapi.com/products")
  //   .then((data) => data.data);

  return defer({
    products,
  });
};

const Products = () => {
  const {
    products,
  }: {
    products: Product[];
  } = useLoaderData<typeof loader>();

  const location = useLocation();

  return (
    <div className="container grid grid-cols-12 gap-4 h-screen overflow-hidden">
      <div className="col-span-8 overflow-y-scroll">
        <Suspense fallback={<p>Loading package location...</p>}>
          <Await resolve={products}>
            <div className="py-5">
              <h1 className="text-2xl">
                Top Remix {products.length} products.
              </h1>
            </div>

            <ProductCard products={products} />
          </Await>
        </Suspense>
      </div>
      <div className="col-span-4">
        {(location.pathname == "/products" ||
          location.pathname == "/products/" ||
          location.pathname == "/products/quickview" ||
          location.pathname == "/products/quickview/") && (
          <h1>Please select quickview item</h1>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Products;

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
