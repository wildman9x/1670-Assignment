import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../redux/slices/user";

const inputs = [
  {
    label: "First Name",
    type: "text",
    id: "FirstName",
    placeholder: "Enter first name",
  },
  {
    label: "Last Name",
    type: "text",
    id: "LastName",
    placeholder: "Enter last name",
  },
  {
    label: "Birth Date",
    type: "date",
    id: "BirthDate",
    placeholder: "Enter birth date",
  },
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
  {
    label: "Confirm Password",
    type: "password",
    id: "confirmPassword",
    placeholder: "Confirm password",
  },
];
const Register = () => {
  const admin = useParams().admin;
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    FirstName: "",
    LastName: "",
    BirthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const user = {
      FirstName: form.FirstName,
      LastName: form.LastName,
      BirthDate: form.BirthDate,
      email: form.email,
      password: form.password,
    };

    dispatch(
      register({
        user,
        admin,
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center mb-3">Register</h1>
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
