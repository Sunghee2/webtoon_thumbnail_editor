import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import '../../styles/TextAdd.scss';

const AddTextSetting = () => {
  return (
    <div className="add-text-setting">
      <TextField
        id="outlined-multiline-static"
        label="Text"
        multiline
        rows={4}
        variant="outlined"
      />

      <FormControl variant="outlined" style={{ width: `100%` }}>
        <InputLabel htmlFor="outlined-age-native-simple">Font</InputLabel>
        <Select native label="Font">
          <option>Arial</option>
          <option>Yeopseo</option>
          <option>Gothic</option>
        </Select>
      </FormControl>
    </div>
  );
};

export default AddTextSetting;
