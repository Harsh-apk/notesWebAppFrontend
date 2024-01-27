import { Link } from "react-router-dom";
const LoginOrCreate = () => {
    return ( 
        <div className="flex  items-center h-5/6 justify-center" >
            <div className="flex justify-around text-2xl p-10 shadow-2xl rounded-3xl  " >
            <Link to="/login" className="p-2 m-2 bg-orange-500 rounded-xl text-white " >LogIn</Link>
            <Link to="/createAcc" className="p-2 m-2 bg-orange-500 rounded-xl text-white" >Create Account</Link>
    
            </div>
        </div>
     );
}
 
export default LoginOrCreate;