import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";

function getSteps() {
  return ["Primeiro passo para cadastrar um paciente", "Segundo passo para cadastrar um paciente", "Salvar"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return `Preencha todos os campos: Nome do Paciente, Comorbidade, Bairro, CPF, Data de Nascimento e Telefone.`;

    case 1:
      return `Verifique se todos os campos foram preenchidos corretamento antes de Salvar.`;

    case 2:
      return `Depois de verificar todos os campos com os dados do paciente, clica no botão Salvar para cadastrar o paciente.
      Depois de Salvar, o paciente estará cadastrado no sistema e poderá ser consultado na tela de Listas de Pacientes.`;

    default:
      return `Default`;
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>Tutorail concluído!</Typography>

            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Ver de novo
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Voltar
              </Button>

              <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Fim" : "Próximo"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
