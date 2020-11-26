import { gql } from "@apollo/client";

export const FETCH_ALL_MERCHANTS = gql`
  {
    getMerchants {
      id
      username
      createdAt
      name
      email
      uniqID
      items {
        id
        username
        itemName
        email
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;

export const FETCH_SINGLE_MERCHANT = gql`
  query($merchantId: ID!) {
    getMerchant(merchantId: $merchantId) {
      id
      username
      createdAt
      name
      email
      uniqID
      items {
        id
        username
        itemName
        email
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;

export const FETCH_MERCHANT_WITH_UID = gql`
  mutation getMerchantWithUID($UID: String!) {
    getMerchantWithUID(UID: $UID) {
      id
      username
      createdAt
      name
      email
      uniqID
      address
      items {
        id
        email
        username
        itemName
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;




export const SCAN_WITH_UID = gql`
  query($UID: String!) {
    scanWithUID(UID: $UID) {
      id
      username
      createdAt
      name
      email
      uniqID
      address
      items {
        id
        email
        username
        itemName
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;
