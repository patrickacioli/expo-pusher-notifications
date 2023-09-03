import { StyleSheet, Text, View } from 'react-native';

import * as ExpoPusherNotifications from 'expo-pusher-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoPusherNotifications.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
