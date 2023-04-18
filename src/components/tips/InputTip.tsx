import { WrappedFieldMetaProps } from "redux-form";

function InputTip({
  meta,
  successMsg = "Looks good!",
}: {
  meta: WrappedFieldMetaProps;
  successMsg?: string;
}) {
  // coupled with Bootstrap + reduxForm
  return (
    <div
      className={`text-${meta.error ? "danger" : "success"} small`}
      style={{ visibility: `${meta.touched ? "visible" : "hidden"}` }}
    >
      {meta.error ? meta.error : successMsg}
    </div>
  );
}

export default InputTip;
