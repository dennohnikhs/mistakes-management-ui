function PaGetAll({ children, onClick }) {
  return (
    <button
      className="py-2 px-6 bg-pa-black lg:py-5 rounded-xl lg:w-[400px] items-center justify-center text-center text-lg text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PaGetAll;
