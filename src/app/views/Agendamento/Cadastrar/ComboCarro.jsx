import React from 'react';

const section = {
  width: "300px",
  height: "50px",
  marginBottom: "16px",
};

const suggestions = [
  { label: 'SIM' },
  { label: 'NÃO' },
  { label: 'DUCA' },
  { label: 'NEIDE' },
];

const ComoboCarro = ({ onChange = () => { } }) => {
  return (
    <select
      id='carro'
      name="carro"
      onChange={onChange}
      style={section}
      required={true}
    >
      <option value="">Selecione um tipo...</option>
      {suggestions.map((carros) => {
        const { carro, label } = carros;
        return (
          <option key={carro} value={carro}> {label}</option>
        )
      })}
    </select>
  );
};

export default ComoboCarro;
