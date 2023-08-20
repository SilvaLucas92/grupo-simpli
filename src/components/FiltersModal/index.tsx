import { useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import styles from "./filters.module.css";
import Select from "../Select";

interface FiltersProps {
  filters: Record<string, any>;
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
          onChange={(e) =>
            setFormState((prev: any) => ({
              ...prev,
              greater: e,
            }))
          }
          value={formState.greater}
          label="Price greater than"
        />
      </div>
      <div className={styles.modalSections}>
        <Input
          onChange={(e) =>
            setFormState((prev: any) => ({
              ...prev,
              less: e,
            }))
          }
          value={formState.less}
          label="Price less than"
        />
      </div>

      <button
        onClick={() => {
          setFilters(formState);
          onClose(false);
        }}
        className={styles.btn}
      >
        save
      </button>
    </Modal>
  );
};
