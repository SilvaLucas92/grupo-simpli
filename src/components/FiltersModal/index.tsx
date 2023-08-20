import { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import styles from "./filters.module.css";
import Select from "../Select";

interface FiltersProps {
  filters: Record<string, any> | null;
  setFilters: any;
  onClose: (value: boolean) => void;
}

export const FiltersModal = ({
  filters,
  setFilters,
  onClose,
}: FiltersProps) => {
  const [formState, setFormState] = useState({
    category: filters && filters.category ? filters.category : "",
    less: filters && filters.less ? filters.less : "",
    greater: filters && filters.greater ? filters.greater : "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = (form: Record<string, any>) => {
    let newFilters: Record<string, any> = {}; // Inicializa newFilters como un objeto vacío
    for (let key in form) {
      const value = form[key];
      if (value !== "") {
        newFilters[key] = value; // Actualiza directamente newFilters con la propiedad y valor filtrado
      }
    }
    setFilters(newFilters);
    onClose(false);
  };

  return (
    <Modal title="Filters" onClose={onClose}>
      <div className={styles.modalSections}>
        <Select
          data={[
            { label: "Motorcicles", value: "motorbike" },
            { label: "Accesories", value: "accesory" },
            { label: "All", value: "" },
          ]}
          onChange={(e) =>
            setFormState((prev: any) => ({
              ...prev,
              category: e === "all" ? "" : e,
            }))
          }
          value={formState.category}
          label="Categories"
        />
      </div>
      <div className={styles.modalSections}>
        <Input
          name="greater"
          onChange={(e) => handleInput(e)}
          value={formState.greater}
          label="Price greater than"
        />
      </div>
      <div className={styles.modalSections}>
        <Input
          name="less"
          onChange={(e) => handleInput(e)}
          value={formState.less}
          label="Price less than"
        />
      </div>

      <button onClick={() => onSave(formState)} className={styles.btn}>
        save
      </button>
    </Modal>
  );
};
