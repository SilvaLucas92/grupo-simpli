import { Input } from "../Input";
import { Modal } from "../Modal";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./modal.module.css";

interface CTAProps {
  onClose: (value: boolean) => void;
}

interface FormState {
  name: string;
  lastname: string;
  email: string;
  phone: number;
}

export const CTAModal = ({ onClose }: CTAProps) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    lastname: "",
    email: "",
    phone: 0,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal title="CTA" onClose={onClose}>
      <section className={styles.container}>
        <div className={styles.names}>
          <Input
            value={formState.name}
            onChange={(e) => handleInput(e)}
            label={"Name"}
            name="name"
          />
          <Input
            value={formState.lastname}
            onChange={(e) => handleInput(e)}
            label={"Lastname"}
            name="lastname"
          />
        </div>
        <Input
          value={formState.email}
          onChange={(e) => handleInput(e)}
          label={"Email"}
          name="email"
        />
        <Input
          value={formState.phone}
          onChange={(e) => handleInput(e)}
          label={"Phone"}
          name="phone"
        />
        <button>Submit</button>
      </section>
    </Modal>
  );
};
