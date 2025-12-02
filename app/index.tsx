import { useEffect, useState } from "react";
import { View,Text, ScrollView } from "react-native";

interface Pokemon {
    name:string;
    url:string;
}

export default function Index() {
    const [pokemons ,setPokemon] = useState<Pokemon[]>([]);
    useEffect(()=>{
        fetchPokemons()
    },[])
    async function fetchPokemons() {
        try{
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            
            const data = await res.json();
            console.log(data);
            setPokemon(data.results)
            
        } 
        catch(e) {
            console.log(e);
            
        }
    }
    return(
        <ScrollView>
            {pokemons.map((pokemon) =>(
                <View key={pokemon.name}>
                    <Text>{pokemon.name}</Text>
                </View>
            ))}

        </ScrollView>    
    )
}
