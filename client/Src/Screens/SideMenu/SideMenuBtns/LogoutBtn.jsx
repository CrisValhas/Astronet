import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../../../Redux/Slice/userSlice";
import { logOut } from '../../../utils/handleCredentials';

const LogoutBtn = ({ text, onPress }) => {

    const dispatch = useDispatch()

    const handleLogOut = () => {
        logOut()
        dispatch(setLogOut())
    }

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={() => handleLogOut()}
        >
            <Text style={ styles.text }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d9d9d9',
        marginTop: 20,
        marginHorizontal: 15,
        padding:15,
        borderRadius: 10,
        justifyContent:"center",
        width:'80%',
        height: 55,
    },
    text: {
        fontWeight:"bold",
        fontSize:15
    }
})

export default LogoutBtn;