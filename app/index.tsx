import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';

interface Pokemon {
  name: string;
  url: string;
}

const POKE_API = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export default function Index() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(POKE_API);
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Request failed ${res.status}: ${body}`);
      }

      const data = await res.json();
      setPokemon(data?.results ?? []);
      console.log('Fetched pokemons:', data?.results?.map((p: Pokemon) => p.name));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MIKE AI APP</Text>

      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>Failed to load: {error}</Text>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    gap: 8,
  },
  item: {
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
  error: {
    color: 'crimson',
  },
});
