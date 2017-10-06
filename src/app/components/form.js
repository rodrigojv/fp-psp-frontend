import React, { Component } from 'react';
import { render } from 'react-dom';

import JsonSchemaForm from 'react-jsonschema-form';
const log = type => console.log.bind(console, type);

class Form extends Component {
  render() {
    const { schema, handleSubmit, handleCancel } = this.props;

    return (
      <JsonSchemaForm
        schema={schema}
        onChange={log('changed')}
        onSubmit={handleSubmit}
        onError={log('errors')}
      >
        <div>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </JsonSchemaForm>
    );
  }
}

export default Form;
