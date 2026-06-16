import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {

try{
await signInWithEmailAndPassword(auth,email,password);
alert("Login Successful");
}
catch(err){
alert(err.message);
}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-semibold mb-6 text-center">
Login
</h2>

<input
type="email"
placeholder="Email"
className="w-full border p-2 mb-4 rounded"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full border p-2 mb-4 rounded"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleLogin}
className="w-full bg-green-600 text-white py-2 rounded"
>
Login
</button>

</div>

</div>

)

}

export default Login;