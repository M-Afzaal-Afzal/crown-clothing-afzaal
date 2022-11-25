import "./form-input.styles.scss";

export const FormInput = ({ label, ...props }) => {
  return (
    <div className="group">
      <input className="form-input" {...props} />
      {label && (
        <labe className={`${props.value.length ? "shrink" : ""} form-input-label`}>{label}</labe>
      )}
    </div>
  );
};
