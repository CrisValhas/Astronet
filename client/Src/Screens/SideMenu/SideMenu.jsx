import React, { useState, useEffect } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, StyleSheet, Image } from "react-native";
import { getCredentials } from '../../utils/handleCredentials';
// import { StackActions, NavigationActions } from 'react-navigation';

import HomeBtn from "./SideMenuBtns/HomeBtn";
import PanelAdminBtn from "./SideMenuBtns/PanelAdminBtn";
import LoginBtn from "./SideMenuBtns/LoginBtn";
import { StackActions, useNavigationState } from '@react-navigation/native';
import ProfileBtn from "./SideMenuBtns/ProfileBtn";
import LogoutBtn from "./SideMenuBtns/LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../Redux/Slice/userSlice";
import img from '../../../assets/logo/logoAstronet.png';


const SideMenu = ({ navigation }) => {

    const dispatch = useDispatch()
    let role = useSelector((state) => state.USER.role);
    let userName = useSelector((state) => state.USER.userName);
    
    const [currentBtn, setCurrentBtn] = useState('HomeNav');
    
    // const index = useNavigationState(state => state?.routes[0].state.index)
    const { routes } = navigation.getState()
    let index = routes[0].state?.index
    let index2 = routes[2].state?.index
    let index3 = routes[3].state?.index

    const handlePressHome = (prop) => {
        // console.log(StackActions.popToTop())
        if(currentBtn === prop && index > 0 ){
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn !== prop && index > 0 ) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index2 > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index3 > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        }
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }

    const handlePressProfile = (prop) => {
        if(currentBtn === prop && index2 > 0 ){
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn !== prop && index2 > 0 ) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index3 > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        }
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }

    const handlePressPanelAdminBtn = (prop) => {
        if(currentBtn === prop && index3 > 0 ){
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn !== prop && index3 > 0 ) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if ( index2 > 0) {
            navigation.dispatch(
                StackActions.popToTop()
            )
        }
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }

    const handlePress = (prop) => {
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }
    useEffect( () => {
        const credentials = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                const { username, role, email } = credentials
                const data = { username, role, email }
                dispatch(setUserData(data))
            };
        }
        credentials()
    }, []);

    return (
        <DrawerContentScrollView
            style={ styles.container }
        >
            <Image style={styles.popUpimg} source={ img } />
            {/* <Text style={ styles.title }>Menu</Text> */}
            <HomeBtn
                text = "Home"
                onPress={() => handlePressHome('HomeNav')}
            />
            { userName ? (
                <ProfileBtn
                    text = "Profile"
                    onPress = { () => handlePressProfile("ProfileNav") }
                />
            ) : null }
            { role === 'admin'||role === 'mod'?(
                <PanelAdminBtn
                    text = "Admin Panel"
                    onPress = { () => handlePressPanelAdminBtn("PanelAdminNav") }
                />
            ) : null }
            { role === 'guest' ? (
                <LoginBtn
                    text = "Login"
                    onPress = { () => handlePress("Login") }
                />
            ) : null }
            { userName ? (
                <LogoutBtn
                    text = "Logout"
                    navigation={navigation}
                />
            ) : null }
            
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        minHeight: '100%',
        backgroundColor: 'white'
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    },
    popUpimg: {
        height: 150,
        width: 150,
        alignSelf:"center",
        resizeMode:"contain",
        borderRadius: 75,
        marginVertical:15
    },
    btn: {
        marginTop:50
    },
})

export default SideMenu;