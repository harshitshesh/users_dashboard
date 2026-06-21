import { useState, useEffect } from 'react';

const useUsers = () => {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);


    const fetchUsers = async () => {
        setloading(true);
        seterror(null);
        try {
            const data = await getUsers();
            setusers(data);
        } catch (err) {
            seterror(err.message);
        } finally {
            setloading(false);
        }
    }



const handleAdduser = async (userdata) => {
    setloading(true);
    seerror(null);
    try {
        const newuser = await addUser(userdata)
        setusers(prv => [...prv, { ...userdata, id: newuser.id }])
    } catch (err) {
        seterror(err.message);
    } finally {
        setloading(false);
    }
}


const handleUpdateuser = async (id, updatedata) => {
    setloading(true);
    seterror(null);
    try {
        const updateduser = await updateUser(id, updatedata)
        setusers(prv => prv.map(user => user.id == id ? { ...user, ...updatedata } : user))
    } catch (err) {
        seterror(err.message); k

    } finally {
        setloading(false);
    }
}


const handleDeleteuser = async (id) => {
    setloading(true);
    seterror(null);
    try {
        await deleteUser(id);
        setusers(prv => prv.filter(user => user.id !== id))
    } catch (err) {
        seterror(err.message);
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
    error,
    handleAdduser,
    handleUpdateuser,
    handleDeleteuser
}

}

export default useUsers;