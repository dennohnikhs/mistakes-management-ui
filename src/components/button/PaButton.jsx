function PaButton({ buttonName }) {
  return (
    <button className="bg-pa-black text-white py-4 px-4 rounded-xl w-32 ">
      <span className="whitespace-nowrap text-sm">{buttonName}</span>
    </button>
  );
}

export default PaButton;
