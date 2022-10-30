import { Box, VStack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { IMPORT_ORDER } from "utils/constants";

const NewImportOrder = () => {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });

    return (
        <VStack direction="column" spacing={4} width="900px">
            <Steps activeStep={activeStep}>
                <Step label={IMPORT_ORDER.ORDER} />
                <Step label={IMPORT_ORDER.BROWSING} />
                <Step label={IMPORT_ORDER.IMPORT} />
                <Step label={IMPORT_ORDER.DONE} />
            </Steps>
        </VStack>
    );
};

export default NewImportOrder;
