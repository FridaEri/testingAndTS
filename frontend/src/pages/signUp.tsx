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

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, address, postalCode, password }),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    alert('Sign-up successful!');
                    console.log(result);
                    setName('');
                    setEmail('');
                    setAddress('');
                    setPostalCode('');
                    setPassword('');
                } else {
                    const error = await response.json();
                    alert(error.error);
                }
            } catch (err) {
                console.error(err);
                alert('Something went wrong. Please try again.');
            }
        }
    };
    
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