import { useState } from "react"
import './signUp.css'

const SignUp: React.FC = () => {
    const [name, setName ] = useState ('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState<{ [key: string]: string}>({})
    
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
    
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
          newErrors.email = "Valid email is required.";
        if (!address.trim()) newErrors.address = "Address is required.";
        if (!postalCode.trim() || !/^\d{5}$/.test(postalCode))
          newErrors.postalCode = "Valid 5-digit postal code is required.";
        if (!password.trim() || password.length < 6)
          newErrors.password = "Password must be at least 6 characters long.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log({name, email, address, postalCode, password});
            alert("Sign-up successful!")

            // clear all fields on form
            setName('')
            setEmail('')
            setAddress('')
            setPostalCode('')
            setPassword('')
        }
      }
    
    return (
      <div className="sign-up-container">
        <h2>Sign up</h2>
        <form className="sign-up-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
             {/* Address */}
             <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress (e.target.value)}
                placeholder="Enter your address"
                />
                {errors.address && <span className="error">{errors.address}</span>}
             </div>
             {/* Postal Code */}
             <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode (e.target.value)}
                placeholder="Enter your postal code"
                />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
             </div>
             <div className="password">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword (e.target.value)}
                placeholder="Enter your password"
                />
                {errors.password && <span className="error">{errors.password}</span>}
             </div>
             <button type="submit" className="sign-up-btn">
                Sign up
             </button>
        </form>
      </div>
    )
  }
  
  export default SignUp