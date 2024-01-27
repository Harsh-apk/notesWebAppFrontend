import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Addnew = ({user,notes,setNotes}) => {
    const [pending,setPending] = useState(false);
    const historyStack = useHistory();
    const url = "http://127.0.0.1:5000/api/v1/user/" + user.id;
    const [title,setTitle] = useState("Title...");
    const [content,setContent] = useState("Notes....");
    const [submit,setSubmit] = useState(false);
    const [error,setError] = useState(null);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmit(true);
    }

    useEffect(()=>{
        if(submit){
            setError(null);
            const postData = async()=>{
                const category = "Note";
                setPending(true);
                const body = {title,content,category};
                try{
                    const res = await fetch(
                        url,
                       {
                        method:'POST',
                        mode:'cors',
                        headers:{
                            'Content-Type':'application/json',
                          },
                        body:JSON.stringify(body),
                        redirect:"follow",
                       });
                    if(!res.ok){
                        setError("Something went wrong");
                        setSubmit(false);
                        return;
                    }
                    const result = await res.json();
                    if(result.error){
                        setError(result.error);
                        setSubmit(false);
                        return;
                    }
                    notes.push(result);
                    setNotes(notes);
                    historyStack.push("/");
                    return;
                }catch(err){
                    setError(err.message);
                }finally{
                    setPending(false);
                }
            }
            postData();

        }
        
    },[submit, title, content, url, notes, setNotes, historyStack]);


    return ( 
        <div className=" m-10" >
            <div className=" m-5 text-2xl font-bold text-orange-500 text-center" >Add New Note</div>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="text-xl p-1 m-2 " ><label>Title</label></div>
                <div ><textarea required value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-3 border-orange-500 rounded-3xl" ></textarea></div>
                <div className="text-xl p-1 m-2 " ><label>Note</label></div>
                <div ><textarea required value={content} onChange={(e)=>setContent(e.target.value)} className="border p-3 border-orange-500 rounded-3xl" ></textarea></div>
                <div className="m-5" ><button className="p-2 bg-orange-500 text-white rounded-2xl font-bold " >Add Note</button></div>
            </form>
            {pending && <div className="text-center" >Loading...</div>}
            {error && <div className=" text-center text-red-500 " >{error}</div>}
        </div>
        
     );
}
 
export default Addnew;