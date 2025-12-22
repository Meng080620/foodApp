import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';


//Screen
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';
import { FoodScreen } from './screens/FoodScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from './screens/CartScreen';
import SearchScreen from './screens/SearchScreen';
import GroceryScreen from './screens/GroceryScreen';

//Icons
import food from '../assets/food.png'
import grocery from '../assets/grocery.png'
import search from '../assets/search.png'
import carts from '../assets/carts.png'
import user from '../assets/user.png'


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: FoodScreen,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={food}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Grocery: {
      screen: GroceryScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={grocery}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={search}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Carts: {
      screen: CartScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={carts}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Account: {
      screen: AccountScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={user}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
