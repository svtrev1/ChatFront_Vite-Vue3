import axios from 'axios';

export const registerUser = async (username, password) => {
    if (!username || !password) {
        throw new Error("Username or password should not be empty.");
    }
    try {
        const response = await axios.post('https://localhost:7115/User/register', null, {params:{username, password}});
        if (response.data === "Username already exist")
        {
            throw new Error("Username already exist");
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (username, password) => 
{
    if (!username || !password) {
        throw new Error("Username or password should not be empty.");
    }
    try {
        const response = await axios.post('https://localhost:7115/User/login', null, {params:{username, password}});
        if (response.data === "Username already exist")
        {
            throw new Error("Username already exist");
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const logout = async (user) => 
{
    try 
    {
        const response = await axios.post('${base_url}/User/logout', user);
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}

export const getUserChats = async (user_id) => {
    try {
        const response = await axios.get('https://localhost:7115/Chat/getUserChats', {params:{user_id}});
        if (response.data === "User is not part of any chat")
        {
            throw new Error("Chats not found");
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}