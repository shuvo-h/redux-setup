import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { myDBusers, updateFirstIndex } from '../slice/userSlice';

const Page1 = () => {
    const dispatch = useDispatch();
    const usersFromStore = useSelector((state)=>{
        return state.storeUsers.users
    })
console.log("from 12th line",usersFromStore);
    const handleButton = () =>{
        const newUser = {id:"00000", name:"new Memberr", phone: "01555555555"};
        dispatch(updateFirstIndex(newUser));
    }

    useEffect(()=>{
        dispatch(myDBusers())
    },[])

    const [users,setusers] = useState([4,5]);
    const [loading,setLoading] = useState(false)
    // useEffect(()=>{
        // setLoading(true)
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(json => setusers(json))
    // },[])

    // useEffect(()=>{

    //     setusers((pam)=>{
    //         console.log("from pam",pam);
    //         const copyA = [...pam];
    //         copyA[0] = 1555;
    //         return copyA
    //     })
    // },[])
    // console.log(users);

    return (
        <div>
            <h1>React Redux</h1>
        <h4>1st page</h4>
        <button onClick={handleButton}>Update my user</button>
        <div>
            <ul>
                {
                    // users.map(user=><li>{user.id}: {user.name} <Link to={`second-page/${user.id}`} >details</Link></li>)
                }
            </ul>
        </div>
        {/* <UserProfile setusers={setusers}></> */}
        {/* <UserSDashboar setusers={setusers}></> */}
        </div>
    );
};

export default Page1;