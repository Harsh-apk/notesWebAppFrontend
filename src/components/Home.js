import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Home = ({ user, notes, setNotes }) => {
  const historyStack = useHistory();
  const url = "http://127.0.0.1:5000/api/v1/user/" + user.id;
  const [pending, setPending] = useState(false);
  const [delPending,setDelPending] = useState(false);
  const [delError,setDelError] = useState(null);

  useEffect(() => {
    if (notes===null) {
      setPending(true);
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const result = await res.json();
          if (result.error) {
            throw new Error(result.error);
          }
          setNotes(result);
        } catch (err) {
          console.error(err);
        } finally {
          setPending(false);
        }
      };

      fetchData();
    }
  }, [url,notes,setNotes]);

  if (pending) {
    return <div className="text-center">Loading...</div>;
  }
  
  if (notes === null) {
    historyStack.push("/");
    return;
  }
  if (notes.result) {
    setNotes([]);
    return (
      <div className=" flex justify-between items-center m-10 ">
      <span className="text-2xl font-bold text-center text-orange-600">
        My Notes
      </span>
      <Link to="/addnew">
        <button className=" bg-orange-500 p-2 rounded-xl text-white ">
          Add New
        </button>
      </Link>
    </div>
    );
  }

  const handleDelete = async(id)=>{
      setDelPending(true);
      const url = "http://127.0.0.1:5000/api/v1/user/" + id;
      try{
        const res = await fetch(url,{
          method: 'DELETE',
          redirect: 'follow'
        })
        if(!res.ok){
          setDelPending(false);
          setDelError("Something went wrong");
          return;
        }
        const result = await res.json();
        if(result.error){
          setDelPending(false);
          setDelError(result.error);
          return;
        }
        setNotes(null);
        setDelError(null);
        setDelPending(null);
        historyStack.push("/");
      }catch(err){
          setDelPending(false);
          setDelError(err.message);
          return;
      }

  }

  return (
    <div className="m-10">
      {delPending && <div>Deleting note ....</div>}
      {delError && <div>{delError}</div>}
      <div className=" flex justify-between items-center ">
        <span className="text-2xl font-bold text-center text-orange-600">
          My Notes
        </span>
        <Link to="/addnew">
          <button className=" bg-orange-500 p-2 rounded-xl text-white ">
            Add New
          </button>
        </Link>
      </div>
      {notes.map((note) => (
        <div
          className="border shadow-xl rounded-3xl border-orange-500 m-10 p-2 md:m-10 md:p-5"
          key={note.id}
        >
          <br></br><h3 className=" text-center"><span className=" text-orange-500 " >Title : </span>{note.title}</h3><br></br>
          <p className="text-center">{note.content}</p><br></br>
          <div className=" flex justify-center m-1 " ><button onClick={()=>{
            handleDelete(note.id)
          }} className=" p-2 bg-orange-500 rounded-xl text-white " >Delete</button></div>
        </div>
      ))}
    </div>
  );
};

export default Home;
