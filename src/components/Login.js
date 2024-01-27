import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({setUser}) => {
  const historyStack = useHistory();
  const [check, setCheck] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("eg:harry@gmail.com");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e) => {
    const body = {email,password};
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/user/login",{
          method:'POST',
          mode:"cors",
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(body),
          redirect:"follow",
        })
      if(!res.ok){
          setCheck(false);
          return;
      }
      const data = await res.json();
      if(data.error!=null){
        setCheck(false);
        return;
      }
      setCheck(true);
      console.log(data);
      ////redirect ------ kal
      setUser(data);
      historyStack.push("/");
      
      return;
    }catch (err){
      setError(err.message);
      return;
    }
  };
  
  
  

  return (
    <div className=" m-5 p-5 h-5/6 flex justify-center">
      <div>
        <h2 className="text-xl font-bold text-center p-5 ">Log In</h2>
        <form className="h-5/6" onSubmit={handleSubmit}>
          <label className="block m-2 text-xl">Email</label>
          <input
            className="block p-2 m-2 border-orange-500 border rounded-lg "
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="block m-2 text-xl">Password</label>
          <input
            className="block p-2 m-2 border-orange-500 border rounded-lg w-max  cursor-text "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button className="p-2 m-2 bg-orange-500 rounded-xl text-xl text-white">
              LogIn
            </button>
          </div>
        </form>
        {!check && !error && <div className="text-center text-red-500 ">Invalid Email or Password</div>}
        {error && <div className="text-center text-red-500 ">{error}</div>}
      </div>
    </div>
  );
};

export default Login;