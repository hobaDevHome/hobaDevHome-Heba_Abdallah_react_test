import { gql } from "@apollo/client";

export const getItemsByCategory = gql`
  query getItemsByCategory($title: String!) {
    category(input: { title: $title }) {
      products {
        name
        gallery
        inStock
        prices {
          currency
          amount
        }
        category
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;
