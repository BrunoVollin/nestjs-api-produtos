import { Button, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [data, setData] = useState([]);

  const getData = async () => {
    try{
      const response = await fetch('http://192.168.0.107:8080/product/getProducts');
      console.log(response);
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  }

  useEffect(() => {
    getData();
  }, []);



  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={({item}) => <Text>{item.productName}</Text>}
        keyExtractor={item => item.id}

      />
 
      <Button title='Clique' onPress={() => {
        getData()
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
