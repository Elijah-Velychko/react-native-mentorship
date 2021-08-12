import database from '@react-native-firebase/database';

database()
  .ref('/users')
  .set([
    {
      name: 'Peter',
      surname: 'Lop',
      id: '22ii',
    },
    {
      name: 'Jake',
      surname: 'Vivivk',
      id: '11ii',
    },
  ])
  .then(() => console.log('Data set.'));
