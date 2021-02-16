var $tableRows
var $createBtn
var $updateBtn

var $usernameFld
var $passwordFld
var $firstnameFld
var $lastnameFld
var $roleFld

var userService = new UserServiceClient()

function deleteUser(event) {
    var index = $(event.target).attr("id")
    var id = users[index]._id
    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

function createUser() {
    // alert("create user")
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstname: $firstnameFld.val(),
        lastname: $lastnameFld.val(),
        role: $roleFld.val()
    }
    if (newUser.username === "" || newUser.password == "" || newUser.firstname == "" ||
        newUser.lastname === "") {
        alert("empty input is not allowed!")
    } else {
        userService.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
                $('form[name=wbdv-input-fields]').get(0).reset();

            })
    }
}

var selectedUser = null
function selectUser(event) {
    var id = $(event.target).attr("id")
    // console.log(id)
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstnameFld.val(selectedUser.firstname)
    $lastnameFld.val(selectedUser.lastname)
    $roleFld.val(selectedUser.role)
}

function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstname = $firstnameFld.val()
    selectedUser.lastname = $lastnameFld.val()
    selectedUser.role = $roleFld.val()
    if (selectedUser.username === "" || selectedUser.password == "" || selectedUser.firstname == "" ||
        selectedUser.lastname === "") {
        alert("empty input is not allowed!")
    } else {
        userService.updateUser(selectedUser._id, selectedUser)
            .then(status => {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
                $('form[name=wbdv-input-fields]').get(0).reset();
            })
    }

}

function renderUsers(users) {
    $tableRows.empty()
    for(var i=0; i<users.length; i++) {
        var user = users[i]
        $tableRows
            .prepend(`
        <tr>
            <td class="wbdv-username">${user.username}</td>
            <td class="wbdv-password">${"*".repeat(user.password.length)}</td>
            <td class="wbdv-first-name">${user.firstname}</td>
            <td class="wbdv-last-name">${user.lastname}</td>
            <td class="wbdv-role">${user.role}</td>
            <td class="wbdv-actions">
                <span class="pull-right">
                    <i class="fa-2x fas fa-search icon-invisible"></i>
                    <i id="${i}" class="fa-2x fa fa-times wbdv-delete"></i>
                    <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
                </span>
            </td>
        </tr>
      `)
    }
    $(".wbdv-delete").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}

function main() {

    $tableRows = jQuery(".table-rows")
    $createBtn = $(".wbdv-create")
    $updateBtn = $(".wbdv-update")

    $usernameFld = $(".username-fld")
    $passwordFld = $(".password-fl")
    $firstnameFld = $(".firstname-fld")
    $lastnameFld = $(".lastname-fld")
    $roleFld = $(".role-fld")

    $updateBtn.click(updateUser)
    $createBtn.click(createUser)
    userService.findAllUsers().then(function (actualUsers) {
        users = actualUsers
        renderUsers(users)
    })
}
$(main)
