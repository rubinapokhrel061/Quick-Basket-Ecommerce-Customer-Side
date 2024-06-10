// import { useDispatch } from "react-redux";
// import axios from "axios";
import Form from "../Form";
import { UserDataType } from "../type";
import { register } from "../../../store/authSlice";
import { useAppDispatch } from "../../../store/hooks";

const Register = () => {
  const dispatch = useAppDispatch();
  const handleRegister = async (data: UserDataType) => {
    console.log(data);
    dispatch(register(data));
    // const response = await axios.post("http://localhost:8080/register", data);
  };

  return (
    <>
      <Form type="register" onSubmit={handleRegister} />
    </>
  );
};

export default Register;
