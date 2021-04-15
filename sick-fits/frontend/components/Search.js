import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  // use the query
  const [findItems, { loading, error, data }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    // this bypasses the apollo cache and fetches the server
    {
      fetchPolicy: 'no-cache',
    }
  );
  // set data to items
  const items = data?.searchTerms || [];
  // debounce the findItems query for not as much fires to network
  const findItemsButChill = debounce(findItems, 350);
  // reset the counter for downshift warning
  resetIdCounter();
  // setting up Downshift
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            id: 'search',
            placeholder: 'search for an item',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                width="50"
                src={
                  item?.photo?.image?.publicUrlTransformed
                    ? item?.photo?.image?.publicUrlTransformed
                    : ''
                }
                alt={item.name}
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem> not items found for - {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
