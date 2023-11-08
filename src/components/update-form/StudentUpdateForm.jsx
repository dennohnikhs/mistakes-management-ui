import { useState } from "react";

function StudentsUpdateForm() {
  const [name, setName] = useState("");
  const [admission_number, setAdmissionNumber] = useState("");
  const [student_class, setStudentClass] = useState("");
  const [stream, setStream] = useState("");
  const [studentStatus, setStudentStatus] = useState("");

  return (
    <div className=" lg:mt-7 px-3">
      <div className="text-pa-white bg-pa-black py-3 px-3  ">
        <div className="gap-2 py-3 pb-4 w-full text-center items-center ">
          <h1> Student details...</h1>
        </div>

        <div className="flex flex-col gap-3 text-pa-black ">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-4 "
            placeholder="name"
            required
          />
          <input
            type="text"
            value={admission_number}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            className="py-3 px-4 "
            placeholder="admission number"
            required
          />
          <input
            type="text"
            value={student_class}
            onChange={(e) => setStudentClass(e.target.value)}
            className="py-3 px-4 "
            placeholder="class"
            required
          />
          <input
            type="text"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="py-3 px-4 "
            placeholder="stream"
            required
          />
          <input
            type="text"
            value={studentStatus}
            onChange={(e) => setStudentStatus(e.target.value)}
            className="py-3 px-4 "
            placeholder="status"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default StudentsUpdateForm;
