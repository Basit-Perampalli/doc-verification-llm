import React from 'react';

function FileUpload({ name, file, onFileChange }) {
  return (
    <div>
      <label>{name.charAt(0).toUpperCase() + name.slice(1)}:
        <input
          type="file"
          name={name}
          onChange={(e) => onFileChange(e, name)}
        />
      </label>
      {file && <p>{file.name}</p>}
    </div>
  );
}

export default FileUpload;
