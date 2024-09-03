
"use client";

import { createRejectSalaryAPIThunkRedux } from "@/lib/store/thunk/rejectSalaryActionCreator";
import React from "react";

import ReactDom from "react-dom";
import { useDispatch } from "react-redux";

const RejectModal: React.FC = ({
  setSalaryAccepted,
  isOpen,
  currentBox,
  onClose,
  setCurrentBox,
}) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  const handleAddModel = (e) => {
    e.preventDefault();

    const fetchApiDataBackend = createRejectSalaryAPIThunkRedux(
      "rejectreq",
      "rejectsuc",
      "rejectfail"
    );
    dispatch(
      fetchApiDataBackend("delete", `/salary/rejectSalary`, {
        currentSalary: currentBox?.currentSalary,
        updatedSalary: currentBox?.updatedSalary,
        id: currentBox?.id,
      })
    );
    setSalaryAccepted((prev) => !prev);
    onClose();
  };

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full max-w-xs relative"> 
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl" 
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900"> 
          Confirm Rejection
        </h2>
        <form className="space-y-4" onSubmit={handleAddModel}>
          <input
            type="submit"
            value={"Reject"}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-80 text-base" 
          />
        </form>
      </div>
    </div>,
    document.getElementById("popupmodal")
  );
};

export default RejectModal;
