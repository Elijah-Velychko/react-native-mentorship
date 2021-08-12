import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Button } from 'react-native';

import database from '@react-native-firebase/database';

const dbUserRef = database().ref('/users');

const addUser = ({ name, surname, id, users }) => {
  dbUserRef.set([...users, { name, surname, id }]);
};

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const OnLoadingListener = dbUserRef.on('value', snapshot => {
      setUsers([]);

      setUsers(snapshot.val());
    });

    return () => {
      dbUserRef.off('value', OnLoadingListener);
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
            addUser({ name: 'Elijah', surname: 'Wood', id: 'ii99', users })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
