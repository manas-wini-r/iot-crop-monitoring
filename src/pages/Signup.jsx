import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSignup = async () => {

try{
await createUserWithEmailAndPassword(auth,email,password);
alert("Account Created");
}
catch(err){
alert(err.message);
}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-semibold mb-6 text-center">
Signup
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
onClick={handleSignup}
className="w-full bg-green-600 text-white py-2 rounded"
>
Create Account
</button>

</div>

</div>

)

}

export default Signup;