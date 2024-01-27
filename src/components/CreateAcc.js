import { useState } from "react";
import { useHistory } from "react-router-dom";
const CreateAcc = ({setUser}) => {
    const historyStack = useHistory();
    const[firstName,setFirstName] = useState("minimum 2 chars");
    const[lastName,setLastName] = useState("minimum 2 chars");
    const[email,setEmail] = useState("eg:harry@gmail.com");
    const[password,setPassword] = useState("");
    const[pending,setPending] = useState(false);
    const [error,setError] = useState(null);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const body = {firstName,lastName,email,password};
        const url = "http://127.0.0.1:5000/api/v1/user/";
        setPending(true);
        try{
            const res = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(body),
                redirect:'follow',
            });
            if(!res.ok){
                setError("Oops! something went wrong 🥲");
                setPending(false);
                return;
            }
            const result = await res.json();
            if(result.error){
                setPending(false);
                setError(result.error);
                return;
            }
            console.log(result);
            setUser(result);
            setPending(false);
            setError(null);
            historyStack.push("/");

        }catch(err){
            setPending(false);
            setError(err.message);
            return;
        }
    }

    return ( 
        <div className="m-10 text-center" >
            {pending && <div className="text-center" >Loading...</div> }
            {error && <div className="text-center" >{error}</div> }
            <h2 className=" text-2xl text-orange-500 font-bold " >Create Account</h2>
            <form onSubmit={handleSubmit} className="m-5" >
                <div className="m-5" ><label>First Name</label></div>
                <div className="m-5" ><input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required className="p-2 border border-orange-500 rounded-2xl" type="text" /></div>
                <div className="m-5" ><label>Last Name</label></div>
                <div className="m-5" ><input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required className="p-2 border border-orange-500 rounded-2xl" type="text" /></div>
                <div className="m-5" ><label>Email</label></div>
                <div className="m-5" ><input value={email} onChange={(e)=>{setEmail(e.target.value)}} required className="p-2 border border-orange-500 rounded-2xl" type="email" /></div>
                <div className="m-5" ><label>Password</label></div>
                <div className="m-5" ><input value={password} onChange={(e)=>{setPassword(e.target.value)}} required className="p-2 border border-orange-500 rounded-2xl" type="password" /></div>
                <div className="m-10"><button className="bg-orange-500 text-white p-2 rounded-2xl font-bold" >Create Account</button></div>
            </form>
        </div>
     );
}
 
export default CreateAcc;