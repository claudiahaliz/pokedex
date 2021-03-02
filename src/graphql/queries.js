import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) @connection(key: "results")  {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

export const GET_POKEMON_DETAIL_OWN = gql`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    weight
    height
    base_experience
    held_items {
      item {
        name
      }
    }
    types {
      type {
        name
      }
    }
    abilities {
      ability {
        name
      }
      is_hidden
    }
    stats {
      base_stat
      effort
      stat {
        name
      }
    }
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
  }
}`;

export const GET_POKEMON_DETAIL = gql`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    weight
    height
    types {
      type {
        name
      }
    }
    abilities {
      ability {
        name
      }
      is_hidden
    }
    stats {
      base_stat
      effort
      stat {
        name
      }
    }
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
  }
}`;

const queries = { GET_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_DETAIL_OWN };

export default queries;
