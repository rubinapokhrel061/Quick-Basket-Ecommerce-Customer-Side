import Form from "../Form";
import { UserDataType } from "../type";
import { register, resetStatus } from "../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleRegister = async (data: UserDataType) => {
    dispatch(register(data));
    // const response = await axios.post("http://localhost:8080/register", data);
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);
  return (
    <>
      <Form type="register" onSubmit={handleRegister} />
    </>
  );
};

export default Register;
