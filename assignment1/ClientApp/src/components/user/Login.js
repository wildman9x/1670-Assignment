import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/user";

const inputs = [
  {
    label: "Email",
    type: "email",
    id: "email",
    placeholder: "Enter email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "Enter password",
  },
];

const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        ...form,
        rememberMe: true,
      })
    );
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <form onSubmit={handleSubmit} className="flex ">
              <h1 className="text-center mb-3">Login</h1>
              {inputs.map((input) => (
                <div key={input.id} className="form-group">
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    type={input.type}
                    className="form-control"
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      setForm({ ...form, [input.id]: e.target.value })
                    }
                  />
                </div>
              ))}

              <button type="submit" className="btn btn-primary btn-block mt-2">
                Login
              </button>
            </form>
            <a className="mt-1 align-self-end" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
