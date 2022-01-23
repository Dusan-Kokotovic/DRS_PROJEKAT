import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { Form, Button } from "semantic-ui-react";
import { set, useForm } from "react-hook-form";
import { validateNumber } from "../helpers/validation";
import { DepositAmount } from "../store/userInfo/actions";
import { getCurrentUserInfo } from "../store/userInfo/actions";

const Deposit = ({history}) => {
    const isVerified = useSelector((state) =>state.userInfo.isVerified);
    const {isLoggedIn} = useSelector((state) => state.auth)
    const [amountError,setAmountError] = useState("");
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        history.push("/");
        window.location.reload();
      }

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) =>{

        if (!validateNumber(data.amount)) {
            setAmountError("Amount is not valid");
            return;
            
          } else {
            setAmountError("");
          }

          dispatch(DepositAmount(data.amount)).then((response) => {
            history.push("/profile");
            window.location.reload();
          });
      }

      useEffect(() => {   
        dispatch(getCurrentUserInfo());
      }, []);

      return (
       
     
      <>
       <Header/>
       {isVerified ?
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field className="m-3 p-1">
            <input
              placeholder="$100"
              type="text"
              {...register("amount", { required: true, maxLength: 25 })}
            />
          </Form.Field>
          {errors.amount && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Please enter amount
            </p>
          )}
           {amountError && <p style={{ color: "red" }}>{amountError}</p>}

            <Button type="submit" className="btn btn-primary m-3   p-1">
            Deposit
          </Button>
      </Form>

      : <h1 style={{textAlign:"center"}}>Acount is not verified</h1>
      
      }
      </>
      );
}


export default Deposit;