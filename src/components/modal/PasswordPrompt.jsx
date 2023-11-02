import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Replace with the id of your root element

const PasswordPrompt = ({ isOpen, onRequestClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(password);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Enter new admin password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default PasswordPrompt;
