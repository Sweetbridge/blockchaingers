import React from 'react'

const CertifiersList = ({ certifiers, onChange }) =>
  <select defaultValue='none' onChange={onChange}>
    <React.Fragment>
    <option value='none' disabled >Select Certifier</option>
      {certifiers.map((certifier, idx) =>
          <option key={'certif-' + idx} value={certifier.value}>{certifier.label}</option>)
      }
    </React.Fragment>
  </select>
export default CertifiersList;
