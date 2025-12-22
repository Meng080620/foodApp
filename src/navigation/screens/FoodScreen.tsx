import { StyleSheet, View } from 'react-native';
import SearchBar from '../../components/common/SearchBar';

export function FoodScreen() {
  return (
    <View style={styles.container}>
      <SearchBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});