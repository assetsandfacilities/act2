import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>

      <Text style={styles.text}>
        Laboratory Activity #5
      </Text>

      <Text style={styles.text}>
        Modal and Gestures
      </Text>

      <Text style={styles.text}>
        Advance Mobile Application Development
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
});