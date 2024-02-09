import React from "react";
import { useNavigate } from "react-router-dom";

const Problem2 = () => {
    const navigate = useNavigate();

    const openModal = (type)=>{
        navigate(`/modal/${type}`);
    }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn" style={{color: "#46139F"}} type="button" onClick={()=>openModal("A")}>
            All Contacts
          </button>
          <button className="btn" style={{color: "#FF7F50"}} type="button" onClick={()=>openModal("B")}>
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
