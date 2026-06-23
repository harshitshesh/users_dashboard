import { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../Services/userservices';
const useUsers = () => {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);


    const fetchUsers = async () => {
        setloading(true);
        setError(null);
        try {
            const data = await getUsers();
            setusers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setloading(false);
        }
    }



const handleAdduser = async (userdata) => {
    setloading(true);
    setError(null);
    try {
        const newuser = await addUser(userdata)
        setusers(prv => [...prv, { ...userdata, id: newuser.id }])
    } catch (err) {
        setError(err.message);
    } finally {
        setloading(false);
    }
}


const handleUpdateuser = async (id, updatedata) => {
    setloading(true);
    setError(null);
    try {
        const updateduser = await updateUser(id, updatedata)
        setusers(prv => prv.map(user => user.id == id ? { ...user, ...updatedata } : user))
    } catch (err) {
        setError(err.message); 

    } finally {
        setloading(false);
    }
}


const handleDeleteuser = async (id) => {
    setloading(true);
    setError(null);
    try {
        await deleteUser(id);
        setusers(prv => prv.filter(user => user.id !== id))
    } catch (err) {
        setError(err.message);
    } finally {
        setloading(false);
    }
}

useEffect(() => {
    fetchUsers();
}, [])

return {
    users,
    loading,
    setError,
    error,
    handleAdduser,
    handleUpdateuser,
    handleDeleteuser
}

}

export default useUsers;