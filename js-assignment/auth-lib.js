function createUser(user_nickname,user_password) {
    let user = {nickname:user_nickname,password:user_password,groups:[],session:false, emulation:false}
    if(allUsers.indexOf(user)!=-1){
        throw Error("Такой пользователь уже есть!");
    }
    allUsers.push(user);
    return user;
};

function deleteUser(user) {
    let index = allUsers.indexOf(user);
    if(index==-1){
        throw Error("Такого пользователя нет!");
    }
    allUsers.splice(index,1);
};

function users() {
    return allUsers;
};

function createGroup() {
let group_name = "Group № "+Math.trunc(Math.random()*100).toString();
let group = {groupname:group_name,rights:[]};
let group_index = allGroups.indexOf(group);
while(group_index!=-1){
    group_name = "Group № "+Math.trunc(Math.random()*100).toString();
    group = {groupname:group_name,rights:[]};
    group_index = allGroups.indexOf(group);
}
allGroups.push(group);
return group;
};

function deleteGroup(group) {
   let group_index = allGroups.indexOf(group);
   if(group_index==-1){
       throw Error("Такой группы нет!");
   }
   for(let i=0;i<allUsers.length;i++){
       if(allUsers[i].groups!=undefined){
        let user_group_index = allUsers[i].groups.indexOf(group);
        if (user_group_index!=-1){
            allUsers[i].groups.splice(user_group_index, 1);
        }
        }
    }
    allGroups.splice(group_index,1);
};

function groups() {
    return allGroups;
};

function addUserToGroup(user,group) {
    let group_index = allGroups.indexOf(group);
    let user_index = allUsers.indexOf(user);
    if(user_index==-1 || user==undefined){
        throw Error("Такого пользователя нет!");
    }
    if(group_index==-1 || group==undefined){
        throw Error("Такой группы нет!");
    }
    let user_group_index = allUsers[user_index].groups.indexOf(group);
    if(user_group_index==-1){
        if(user.groups==undefined){
            user.groups=[];
        }
        user.groups.push(group);
    }  
};

function userGroups(user) {
    let userGroups = [];
    if(user.groups!=undefined){
        for(let i =0;i<user.groups.length;i++){
            userGroups[i]=user.groups[i];
        }
    }
    return userGroups;
};

function removeUserFromGroup(user,group) {
    let user_index = allUsers.indexOf(user);
    let group_index = allGroups.indexOf(group);
    if (user_index == -1 || group_index == -1)
        throw new Error("Такого пользователя\группы нет!");
    let innerIndex = allUsers[user_index].groups.indexOf(group);
    if (innerIndex != -1) {
        user.groups.splice(innerIndex, 1);
    }
    else throw Error('Пользователь не состоит в этой группе');
};

function createRight() {
    let right = "Right № " + +Math.trunc(Math.random()*100).toString();
     let right_index = allRights.indexOf(right);
     while(right_index!=-1){
        right = "Right № " + +Math.trunc(Math.random()*100).toString();
        right_index = allRights.indexOf(right);
     }
    allRights.push(right);
    return right;
};

function deleteRight(right) {
    let right_index = allRights.indexOf(right);
    if(right_index==-1||right==undefined){
        throw Error("Такого права нет!");
    }
    for(let i=0;i<allGroups.length;i++){
        if(allGroups[i].rights!=undefined){
            let group_right_index = allGroups[i].rights.indexOf(right);
               if(group_right_index!=-1){
                allGroups[i].rights.splice(group_right_index,1);
               }
             }
         }
    allRights.splice(right_index,1);
};

function groupRights(group) {
    let group_rights = [];
    for(let i =0;i<group.rights.length;i++){
        group_rights[i]=group.rights[i];
    }
    return group_rights;
};

function rights() {
    return allRights;
};

function addRightToGroup(right,group) {
    let rigth_index = allRights.indexOf(right);
    let group_index = allGroups.indexOf(group);
    if(rigth_index==-1 || right == undefined){
        throw Error("Такого права нет!");
    }
    if(group_index==-1 || group == undefined){
        throw Error("Такой группы нет!");
    }
    let group_right_index = group.rights.indexOf(right);
    if(group_right_index==-1||group.rights==undefined){
        if(group.rights==undefined){
            group.rights = [];
        }       
        group.rights.push(right);
    }
};

function removeRightFromGroup(right,group) {
    let rigth_index = allRights.indexOf(right);
    let group_index = allGroups.indexOf(group);
    if(rigth_index==-1 || right == undefined){
        throw Error("Такого права нет!");
    }
    if(group_index==-1 || group == undefined){
        throw Error("Такой группы нет!");
    }
    let group_right_index = group.rights.indexOf(right);
    if(group_right_index==-1 || group.rights==undefined){
        throw Error("Такого права у группы нет!");
    }
    group.rights.splice(group_right_index,1);
};

function login(username, password) {
    let login_user = undefined;
    for(let i = 0; i < allUsers.length;i++) {
        if(allUsers[i].session == true) {
            return false;
        }
        else if(allUsers[i].nickname == username && allUsers[i].password == password){
            login_user = allUsers[i];
        }
    }
    if(login_user == undefined){
        return false;
    }
    login_user.session = true;
    return login_user.session;
};

function currentUser() {
   for(let i = 0;i<allUsers.length;i++){
       if(allUsers[i].session==true){
           return allUsers[i];
       }
   }
};

function logout() {
    if(currentUser()!=undefined){
        let emulation_flag = false;
        for(let i = 0;i<allUsers.length;i++){
            if(allUsers[i].emulation){
                allUsers[i].emulation = false;
                emulation_flag = true;
            }
        }
        if(emulation_flag == false){
            currentUser().session = false;
        }
    }
};

function isAuthorized(user, right) {
    let right_index = allRights.indexOf(right);
    let user_index = allUsers.indexOf(user);
    if(right_index == -1 || user_index == -1){
        throw Error("Пользователя/права нет!");
    }
for (let i = 0; i<user.groups.length; i++){
        if (user.groups[i].rights.indexOf(right)!=-1){
            return true;
        }
    }
    return false;
};

function loginGuest(username){
    let user_index = -1;
    for(let i = 0;i<allUsers.length;i++){
        if(username == allUsers[i].nickname){
            user_index = i;
            break;
        }
    }
    if(user_index == -1){
        throw Error("Такого пользователя нет!");
    }
    let guest_group = false;
    let user = allUsers[user_index];
    for(let i = 0;i<user.groups.length;i++){
        if(user.groups[i].groupname == "guest"){
            guest_group = true;
        }
    }
    if(guest_group){
        login(user.nickname,user.password);
    }
};

function loginAs(user){
    let user_groups = userGroups(user);
    let in_groups = false;
    if(user_groups!=undefined){
        for(let i = 0;i<user_groups.length;i++){
            if(user_groups[i].groupname =="admin" || user_groups[i].groupname=="manager"){
                in_groups = true;
            }
        }
    }
    if(in_groups){
        if(currentUser()!=undefined) {
            user.emulation = true;
        }
        else {
            throw Error("Нет активных пользователей!");
        }
    }

};
function securityWrapper(action, right){
    let current = currentUser();
    if(current!=undefined){
        let has_right = false;
        for(let i = 0;i<current.groups.length;i++){
            if(current.groups[i].rights.indexOf(right)!=-1){
                has_right = true;
                break;
            }
        }
        if(has_right){
            return function (){
                action.apply(null,arguments);
                for(let i = 0;i<listeners.length;i++){
                    listeners[i](current,action);
                }
            };
        }
    }
};
function addActionListener(listener){
    listeners.push(listener);
};
function increaseCounter(amount) { 
    counter += amount
 };
var allRights = ["manage content", "play games", "delete users", "view site","guest rights","canIncreaseCounter"];
var allGroups = [
    {groupname: "admin", rights: [allRights[2],allRights[5]]},
    {groupname: "manager", rights: [allRights[0]]},
    {groupname: "basic", rights: [allRights[1], allRights[3]]},
    {groupname: "guest",rights: [allRights[4]]}
]
var allUsers = [
	{nickname: "admin", password: "1234", groups: [allGroups[0], allGroups[1], allGroups[2]], session: false, emulation:false},
	{nickname: "sobakajozhec", password: "ekh228", groups: [ allGroups[1], allGroups[2]], session: false, emulation:false},
	{nickname: "patriot007", password: "russiaFTW", groups: [allGroups[2]], session: false,  emulation:false}
];
var listeners = [];
var counter = 0;

/*var user1 = createUser("user1","123");
var user2 = createUser("user2","456");
var group1 = createGroup();
var group2 = createGroup();
deleteUser(user1);
deleteGroup(group2);
addUserToGroup(user2,group1);
login(user2.nickname,user2.password);
login(user2.nickname,user2.password);
logout();
var right1 = createRight();
var right2 = createRight();
addRightToGroup(right1, group1);
addRightToGroup(right2, group1);
isAuthorized(user, right1);
isAuthorized(user, right2);
login("admin", "1234"); 
var u = createUser("123","123");
addUserToGroup(u,groups()[3]);
loginGuest("123"); 
logout();
login("admin", "1234"); 
loginAs(users()[0]);
logout();
var secureIncreaseCounter = securityWrapper(increaseCounter, "canIncreaseCounter");
addActionListener(function(user, action) { 
    console.log("Пользователь " + user.nickname + " только что сделал " + action.name); 
});

addActionListener(function(user, action) { 
    console.log("Пользователь " + user.nickname + " только что сделал " + action.name); 
});

secureIncreaseCounter(1);
logout();
console.log(counter == 1); 
*/
