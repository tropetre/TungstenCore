export class EditModel {
    //UserId: string;
    OldPassword: string;
    NewPassword: string;
    NewPasswordConfirm: string;
    UserName: string;
    Email: string;

    constructor(/*userid: string, */oldpassword: string, username: string, email: string, newpassword: string, newpasswordconfirm: string) {
        //this.UserId = userid;
        this.OldPassword = oldpassword;
        this.UserName = username;
        this.Email = email;
        this.NewPassword = newpassword;
        this.NewPasswordConfirm = newpasswordconfirm;
    }
}