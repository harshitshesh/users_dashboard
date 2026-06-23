
const BASE_URL = "https://jsonplaceholder.typicode.com";



const transformUser = (user) => {
  const [firstName = "", ...rest] = user.name.split(" ");
  return {
    id: user.id,
    firstName,
    lastName: rest.join(" "),
    email: user.email,
    department: user.company?.name || "N/A",
  };
};

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`)

    if (!response.ok) throw new Error("Failed to fetch users")

    const data = await response.json()
    return data.map(transformUser);
}

export const addUser = async (userdata) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userdata),

    });

    if (!response.ok) throw new Error("Failed to add user")
    const data = await response.json()
    return data;
}


export const updateUser = async (id, userdata) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userdata),
    });
    if (!response.ok) throw new Error("Failed to update user")

    const data = await response.json()
    return data;
}


export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",

    });

    if (!response.ok) throw new Error("Failed to delete user")
    return true;
}

