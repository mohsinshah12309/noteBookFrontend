import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Check password match
        if(credentials.password !== credentials.cpassword) {
             props.showAlert("Incorrect Password","danger");
            return;
        }

        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        });
        
        const json = await response.json();
        console.log(json);
        
        if(json.success){
            localStorage.setItem('token', json.authToken); // Fixed property name
            navigate("/"); // Fixed navigation
             props.showAlert("Successfully created account","success");
        }
        else{
            props.showAlert("Registeration Failed","danger");
        }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div className="container">
            <div className="mt-3 my-3">
        <h2>Signup to use NoteBook</h2>
      </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        onChange={onChange}
                        className="form-control"
                        id="name"
                        name="name" // Added name attribute
                        value={credentials.name} // Added value binding
                        required
                        minLength={3}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        onChange={onChange}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email" // Added name attribute
                        value={credentials.email} // Added value binding
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password" // Added name attribute
                        value={credentials.password} // Added value binding
                        required
                        minLength={5}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword" // Added name attribute
                        value={credentials.cpassword} // Added value binding
                        required
                        minLength={5}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;