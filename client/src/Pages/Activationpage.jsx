import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Activationpage = () => {
  const { activation_token } = useParams();
  const currentUrl = window.location.href;
  const [error, setError] = useState();
  let count = 0;

  function usercheck() {
    const searchString = "/seller-acount";
    const isStringPresent = currentUrl.includes(searchString);

    // console.log("usecheck Function RUn", count);
    // console.log("count is  : ", count);
    if (activation_token && count === 0 && !isStringPresent) {
      try {
        console.log("if condition run", count);
        count = 1;
        axios
          .post(
            `${process.env.REACT_APP_SERVER}/api/user/activation`,
            { activation_token },
            { withCredentials: true }
          )
          .then((resp) => {
            console.log(resp);
            if (resp.data.success) {
              setError(true);
            }
          })
          .catch((error) => {
            console.log("Thier is an Eroor", error);
          });
      } catch (error) {
        console.log(error);
        // setError(true);
      }
    } else if (activation_token && count === 0 && isStringPresent) {
      try {
        console.log("Else if Condition Run! ");
        axios
          .post(
            `${process.env.REACT_APP_SERVER}shop/shopactivation`,
            { activation_token },
            { withCredentials: true }
          )
          .then((resp) => {
            console.log(resp);
            if (resp.data.success) {
              toast.success("Account Created Successfully!");
              setError(false);
            }
          })
          .catch((error) => {
            console.log("Thier is an Eroor", error);
            setError(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (activation_token) {
      usercheck();
    }
    console.log("UseEffect Run", count);
  }, []);

  return (
    <div>{error ? <div>Activation Page</div> : <div>Token Expired</div>}</div>
  );
};

export default Activationpage;
