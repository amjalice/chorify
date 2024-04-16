import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Input from "./UI/Input/Input";
import AuthContext from "../store/auth-context";
import Button from "./UI/Button/Button";
import Card from "./UI/Card/Card";
import classes from "./Login/Login.module.css";
import cssFile from "./LandingPage.css";

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};

const roleReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};

const familyNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { value: "", isValid: false };
};

const familyPasswordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};

const Registration = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [roleState, dispatchRole] = useReducer(roleReducer, {
    value: "",
    isValid: null,
  });
  const [familyNameState, dispatchFamilyName] = useReducer(familyNameReducer, {
    value: "",
    isValid: null,
  });
  const [familyPasswordState, dispatchFamilyPassword] = useReducer(
    familyPasswordReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const authCtx = useContext(AuthContext);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const roleInputRef = useRef();
  const familyNameInputRef = useRef();
  const familyPasswordInputRef = useRef();

  const { isValid: nameIsValid } = nameState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: roleIsValid } = roleState;
  const { isValid: familyNameIsValid } = familyNameState;
  const { isValid: familyPasswordIsValid } = familyPasswordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        nameIsValid &&
          emailIsValid &&
          passwordIsValid &&
          roleIsValid &&
          familyNameIsValid &&
          familyPasswordIsValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [
    nameIsValid,
    emailIsValid,
    passwordIsValid,
    roleIsValid,
    familyNameIsValid,
    familyPasswordIsValid,
  ]);

  const backHandler = (e) => {
    e.preventDefault();
    props.registerHandler();
  };

  const nameChangeHandler = (e) => {
    dispatchName({ type: "USER_INPUT", val: e.target.value });
  };

  const validateNameHandler = (e) => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const validateEmailHandler = (e) => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };

  const validatePasswordHandler = (e) => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const roleChangeHandler = (e) => {
    dispatchRole({ type: "USER_INPUT", val: e.target.value });
  };

  const validateRoleHandler = (e) => {
    dispatchRole({ type: "INPUT_BLUR" });
  };

  const familyNameChangeHandler = (e) => {
    dispatchFamilyName({ type: "USER_INPUT", val: e.target.value });
  };

  const validateFamilyNameHandler = (e) => {
    dispatchFamilyName({ type: "INPUT_BLUR" });
  };

  const familyPasswordChangeHandler = (e) => {
    dispatchFamilyPassword({ type: "USER_INPUT", val: e.target.value });
  };

  const validateFamilyPasswordHandler = (e) => {
    dispatchFamilyPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      authCtx.onRegister(
        nameState.value,
        emailState.value,
        passwordState.value,
        roleState.value,
        familyNameState.value,
        familyPasswordState.value
      );
      props.registerHandler();
      props.loginHandler();
      console.log("FORM IS VALID - SUBMIT");
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else if (!roleIsValid) {
      roleInputRef.current.focus();
    } else if (!familyNameIsValid) {
      familyNameInputRef.current.focus();
    } else if (!familyPasswordIsValid) {
      familyPasswordInputRef.current.focus();
    }
  };

  return (
    <div className="reg-card-container">
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div className="register-container">
            <h2>Family Account</h2>
            <p className="dummy-msg">
              The app is currently in demo mode, you may skip registration and
              go to login.
            </p>
            <Input
              ref={nameInputRef}
              id="name"
              label="Name"
              type="text"
              isValid={nameIsValid}
              value={nameState.value}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
            />
            <Input
              ref={emailInputRef}
              id="email"
              label="E-Mail"
              type="email"
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <Input
              ref={roleInputRef}
              id="role"
              label="Role"
              type="text"
              placeholder="mother, son, roommate.."
              isValid={roleIsValid}
              value={roleState.value}
              onChange={roleChangeHandler}
              onBlur={validateRoleHandler}
            />
            <Input
              ref={familyNameInputRef}
              id="family-name"
              label="Family Name"
              type="text"
              isValid={familyNameIsValid}
              value={familyNameState.value}
              onChange={familyNameChangeHandler}
              onBlur={validateFamilyNameHandler}
            />
            <Input
              ref={familyPasswordInputRef}
              id="family-password"
              label="Family Password"
              type="password"
              placeholder="shared password"
              isValid={familyPasswordIsValid}
              value={familyPasswordState.value}
              onChange={familyPasswordChangeHandler}
              onBlur={validateFamilyPasswordHandler}
            />
            <span className="family-note">
              Your whole family can use this password along with the e-mail to
              login.
            </span>
          </div>

          <div className={"action-buttons-container reg-submit"}>
            <Button onClick={backHandler} className={"back-btn"}>
              Back
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Registration;
