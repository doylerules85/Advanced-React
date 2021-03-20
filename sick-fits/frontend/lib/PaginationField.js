import { ALL_PRODUCTS_QUERY } from '../components/Pagination';

export default function PaginationField() {
  return {
    keyArgs: false, // tell apollo were taking care of it
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read the number of items from the cache
      const data = cache.readQuery({ query: ALL_PRODUCTS_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((item) => item);
      //   if there are items but not enough items AND on last page -- just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have items? return false
        return false;
      }
      // if items, return them from the cache - no network needed
      if (items.length) {
        return items;
      }
      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args; // get skip and first from arguments
      // this runs when Apollo client comes back from the network with all products
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
