import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  
  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let user = res.DT.map((item) => {
      
        return {
          value: item.id,
         
          label: `${item.id} - ${item.username} -${item.email}`,
        };
        
      });
      setListUser(user);
    }
  };
  const handleAssign = async() =>{
    console.log("Quiz ID:", selectedQuiz.value);
  console.log("User ID:", selectedUser.value);
    let res= await postAssignQuiz(selectedQuiz.value,selectedUser.value)
    if(res && res.EC===0){
      toast.success(res.EM);

    }
    else{
      toast.error(res.EM)
    }

  }
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3"
        onClick={()=>{
          handleAssign()
        }}>Assign</button>
      </div>
    </div>
  );
};
export default AssignQuiz;
