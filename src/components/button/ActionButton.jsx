function UpdateButton({ children, onClick }) {
  return (
    <button
      className="py-2 px-2 bg-green-500  rounded-xl  items-center justify-center text-center text-lg text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default UpdateButton;
