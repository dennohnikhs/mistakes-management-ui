import { useState } from "react";

function StudentsUpdateForm() {
  const [name, setName] = useState("");
  const [admission_number, setAdmissionNumber] = useState("");
  const [student_class, setStudentClass] = useState("");
  const [stream, setStream] = useState("");
  const [studentStatus, setStudentStatus] = useState("");

  return (
    <div>
      <div className="text-pa-white bg-pa-black ">
        <div className=" py-3 text-center items-center ">
          <h1> New Student details...</h1>
        </div>

        <div className="flex flex-col gap-3 text-pa-white bg-pa-white px-2 py-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-4 text-pa-black bg-white border border-gray-300  shadow-lg "
            placeholder="name"
            required
          />
          <input
            type="text"
            value={admission_number}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg "
            placeholder="admission number"
            required
          />
          <input
            type="text"
            value={student_class}
            onChange={(e) => setStudentClass(e.target.value)}
            className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg"
            placeholder="class"
            required
          />
          <input
            type="text"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg "
            placeholder="stream"
            required
          />
          <input
            type="text"
            value={studentStatus}
            onChange={(e) => setStudentStatus(e.target.value)}
            className="py-3 px-4 text-pa-black bg-white border border-gray-300 shadow-lg"
            placeholder="status"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default StudentsUpdateForm;
