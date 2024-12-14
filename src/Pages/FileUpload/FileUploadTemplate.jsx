import { FileUpload } from "primereact/fileupload";
import PropTypes from "prop-types";

export default function FileUploadTemplate({ enabled }) {
  return (
    <div>
      <div className="card mt-3">
        <FileUpload
          name="demo[]"
          url={"/api/upload"}
          multiple
          accept="image/*"
          maxFileSize={1000000}
          disabled={!enabled}
          emptyTemplate={
            <p className="m-0">Drag and drop files here to upload.</p>
          }
        />
      </div>
    </div>
  );
}

FileUploadTemplate.propTypes = {
  enabled: PropTypes.bool.isRequired,
};
