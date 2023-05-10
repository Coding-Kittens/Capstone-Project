import ThemeForm from "../forms/ThemeForm";
import ChangePasswordform from "../forms/ChangePasswordform";
import DeleteUserForm from "../forms/DeleteUserForm";
import { useState, useContext } from "react";

import { UserContext, MessageContext } from "../context/context";
import useAxios from "../hooks/useAxios";
import "../css/Settings.css";

//shows user settings
//shows the change password form
//shows the theme form
//shows the delet user form
const Settings = ({ deleteUser }) => {
  const currentUser = useContext(UserContext);
  const setMessage = useContext(MessageContext).setMessage;

  const [deleteForm, setDeleteForm] = useState(false);

  const [reqUser] = useAxios(currentUser);

  const changePassword = (data) => {
    reqUser(
      "patch",
      `/users/${currentUser.username}/change_password`,
      "user",
      data
    );
  };

  const showDeleteForm = () => {
    setDeleteForm(true);
    setMessage({
      text:
        "Are you sure you want to delete your account all of your information like, books, libraries, characters, notes, extra… will be deleted. Make sure you have a copy of the information you want to keep first!",
      color: "#BF504A",
    });
  };

  return (
    <div className="Settings">
      <ThemeForm />
      <ChangePasswordform changePassword={changePassword} />

      <button className="DeleteForm" type="button" onClick={showDeleteForm}>
        Delete Account
      </button>

      {deleteForm ? (
        <DeleteUserForm
        closeForm={() => setDeleteForm(false)}
        submit={deleteUser}
        />
      ) : null}
    </div>
  );
};
export default Settings;
