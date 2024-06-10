import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { UserLoginType } from "../type";
import { login, resetStatus } from "../../../store/authSlice";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";

const Login = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogin = async (data: UserLoginType) => {
    console.log(data);
    dispatch(login(data));
    // const response = await axios.post("http://localhost:8080/register", data);
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status, navigate, dispatch]);
  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  );
};

export default Login;
