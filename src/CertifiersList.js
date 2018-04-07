import React from 'react'

const CertifiersList = ({ certifiers, onChange }) =>
  <select defaultValue='none' onChange={onChange}>
    <React.Fragment>
    <option value='none' disabled >Select who you would like to certify your record</option>
      {certifiers
        .map(certifier => <option value={certifier.value}>{certifier.label}</option>)
        // .unshift()
      }
    </React.Fragment>
  </select>
export default CertifiersList;
