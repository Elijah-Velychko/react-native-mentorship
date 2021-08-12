import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Button } from 'react-native';

import database from '@react-native-firebase/database';

// database()
//   .ref('/users')
//   .set([
//     {
//       name: 'Peter',
//       surname: 'Lop',
//       id: '22ii',
//     },
//     {
//       name: 'Jake',
//       surname: 'Vivivk',
//       id: '11ii',
//     },
//   ])
//   .then(() => console.log('Data set.'));

const addUser = ({ name, surname, id }) => {
  database().ref('/users').push({
    name,
    surname,
    id,
  });
};

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userDBRef = database().ref('/users');

    const OnLoadingListener = userDBRef.on('value', snapshot => {
      setUsers([]);

      setUsers(prevState => snapshot.val());
    });

    return () => {
      userDBRef.off('value', OnLoadingListener);
    };
  }, []);

  const renderUserList = ({ item }) => {
    return (
      <View
        style={{
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderBottomColor: 'red',
          marginTop: 5,
          flex: 2,
        }}>
        <Text style={{ marginBottom: 5 }}>User Name: {item.name}</Text>
        <Text>User Surname: {item.surname}</Text>
      </View>
    );
  };

  const keyExtractor = item => item.id;

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 38 }}>
        <Text>User List</Text>
        {users && (
          <FlatList
            data={users}
            renderItem={renderUserList}
            keyExtractor={keyExtractor}
            style={{ marginTop: 10 }}
          />
        )}
      </View>
      <View>
        <Button
          title="Add New User"
          onPress={() =>
            addUser({ name: 'Jake', surname: 'Ivanov', id: 'ii66' })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
