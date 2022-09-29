import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'

const SignIn = (props) => {
    const {navigation} = props;
    return (
        // <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode='contain'
                        source={require('../../../assets/images/coffee_banner.jpg')} />
                </View>
                <View style={styles.cafeContainer}>
                    <Text style={styles.cafeText}>Đăng nhập</Text>
                </View>
                <View style={styles.TextInputContainer}>
                    <TextInput
                        style={styles.textInput} placeholder='Email' />
                    <TextInput
                        style={styles.textInput} secureTextEntry placeholder='Mật khẩu' />
                        <View>
                            <Text style={styles.textForgotPass} onPress={()=>{navigation.navigate("Forgot")}}>Quên mật khẩu ?</Text>
                        </View>
                    <Pressable style={styles.buttonContainer}
                    >
                        <Text style={styles.login}>Đăng nhập</Text>
                    </Pressable>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0', margin: 20 }} />
                    <View>
                        <Text style={{ width: 15, textAlign: 'center' }}>or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0', margin: 20 }} />
                </View>

                <View style={styles.other}>
                    <Image style={[styles.icon, styles.iconGG]} source={require('../../../assets/images/google_icon.png')}/>
                    <Image style={[styles.icon, styles.iconFB]} source={require('../../../assets/images/facebook_icon.png')}/>
                </View>
                <View style={styles.textSignUp}>
                    <Text>
                        Chưa có tài khoản ? 
                    </Text>
                    <Text onPress={()=>{navigation.navigate("Register")}}
                          style={styles.textNew}> Tạo mới</Text>
                </View>

            </View>
        </ScrollView>
        //</KeyboardAvoidingView>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
        flex: 1,
    },
    imageContainer: {
        width: '80%',
        height: 300
    },
    image: {
        width: '100%',
        height: '100%'
    },
    cafeContainer: {
        paddingLeft: 10,
        paddingVertical: 1
    },
    cafeText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 36
    },
    TextInputContainer: {

        paddingHorizontal: 10,
        marginVertical: 10
    },
    textInput: {
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 10
    },
    textForgotPass:{
        fontSize: 14,
        marginVertical: 10,
        color: '#52CC6D',
        textAlign: 'right',
    },
    buttonContainer: {
        height: 50,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#52CC6D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: 'white',
        fontSize:18
    },
    other:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 40,
        height: 40,
        marginHorizontal: 15,
    },
    textSignUp:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 24
    },
    textNew:{
        color:'#1BAC4B'
    },
})



