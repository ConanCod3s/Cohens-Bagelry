import { Fragment, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';

const auth = getAuth();


export const LoginButton = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
            console.log('**************Created Account');
        } catch (err: any) {
            console.log('**************Created err', err);
        }
    };

    return (
        <Stack>
            <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
                onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
                id="outlined-disabled"
                label="Password"
                defaultValue=""
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
        </Stack>

    )
    // return (
    //     <div>
    //         <h2>Login</h2>
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button onClick={handleLogin}>Login</button>
    //         {error && <p style={{ color: 'red' }}>{error}</p>}
    //     </div>
    // );
};

export default LoginButton;
