import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { Form, Button } from "semantic-ui-react";
import { GetCoins } from "../store/coinMarket/actions";
import { useForm } from "react-hook-form";
import { validateNumber } from "../helpers/validation";


const Exchange = ({history}) =>{

    const isVerified = useSelector((state) =>state.userInfo.isVerified);
    const coins = useSelector((state) => state.coinMarket)
    const {isLoggedIn} = useSelector((state) => state.auth)
    const [amountError,setAmountError] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    if (!isLoggedIn) {
        history.push("/");
        window.location.reload();
      }

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      useEffect(() => {
        setLoading(true);
        dispatch(GetCoins()).then((response) => {
        setLoading(false);
         });
        }, []);

      const onSubmit = (data) =>{

        if (!validateNumber(data.amount)) {
            setAmountError("Amount is not valid");
            return;
            
          } else {
            setAmountError("");
          }

         //

      }

    return(
        <>
        <Header/>
        <div>
            {isLoading ? (
                <strong>Loading coins market </strong>
            ) : (
            <div>
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
            Buy coins
          </Button>
             </Form>
            </div>
            )
            
            }
                
        
        </div>

        </>
    )
}

export default Exchange;

