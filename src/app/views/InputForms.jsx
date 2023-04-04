import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const InputCpf = React.forwardRef(function InputCpf(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000.000.000-00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputDate = React.forwardRef(function InputDate(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00/00/0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputPhone = React.forwardRef(function InputPhone(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(00) 00000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

InputCpf.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputDate.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputPhone.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export { InputCpf, InputDate, InputPhone };