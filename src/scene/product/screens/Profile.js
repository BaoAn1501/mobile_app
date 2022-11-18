import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../user/UserContext'

const Profile = (props) => {
  const {navigation} = props;
  const {onGetUser, userID} = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async function getUser() {
      const res1 = await onGetUser(userID);
      //
      // {
      //   "_id": "635b993222cdefc4bdb25e7b",
      //   "full_name": "bao an",
      //   "email": "an@gmail.com"
      // }
      setUser(res1);
    })()
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      {/* ảnh đại diện */}
      <Image source={{uri: user.avatar ? user.avatar : 'https://cdn.icon-icons.com/icons2/2645/PNG/512/person_circle_icon_159926.png'}}></Image> 
      <Text>Tên người dùng: {user.full_name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})