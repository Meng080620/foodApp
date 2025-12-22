import { StyleSheet, View } from 'react-native';
import SearchBar from '../../components/common/SearchBar';
import Location from '../../components/common/Location';

export function FoodScreen() {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <Location/>
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