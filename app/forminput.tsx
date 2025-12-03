import React from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen options={{ title: 'Form Input' }} />
        <Text style={styles.inputTitle}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder='Input Name'
        />
        <Text style={styles.inputTitle}>Nomor Induk Mahasiswa</Text>
        <TextInput
          style={styles.input}
          placeholder="Input NIM"
        />
        <Text style={styles.inputTitle}>Kelas</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Kelas"
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: 340 }}>
            <Button
              title="Save"
              color="#f194ff"
            />
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'pink',
    borderRadius: 5,
    borderColor: 'pink',
  },
  inputTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: 'pink'
  },
  
});

export default TextInputExample;