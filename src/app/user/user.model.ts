export class UserModel {

  constructor(
    uid: string | null,
    displayName: string | null,
    email: string | null,
    isAdmin: boolean) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.isAdmin = isAdmin;
  }
  uid: String | null;
  displayName: String | null;
  email: String | null;
  isAdmin: boolean;

}
