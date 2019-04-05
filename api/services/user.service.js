import dummyData from '../utils/dummyData'
import User from '../models/user.model';

const UserService = {

    fetchAllUsers(){
        const validUsers = dummyData.users.map((user) => {
            const newUser = new User();
            newUser.id = user.id;
            newUser.email = user.email;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.password = user.password;
            newUser.type = user.type;
            newUser.isAdmin = user.isAdmin;
        });
        return validUsers;
    },

    addUser(user){
        const userLength = dummyData.users.length;
        const lastId = dummyData.users[userLength - 1].id;
        const newId = lastId + 1;
        user.id = newId;
        dummyData.users.push(user);
        return user;
    },

    getAUser(id){
        const user = dummyData.users.find(meal => meal.id = id);
        return user || {};
    }

};

export default UserService;