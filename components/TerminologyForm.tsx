import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { indexConcept } from "../hooks";
import { generateUid } from "../utils";

interface TerminologyFormProps {
  index: string;
}

const TerminologySchema = Yup.object().shape({
  id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  shortName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const TerminologyForm: FC<TerminologyFormProps> = ({ index }) => {
  const router = useRouter();
  const { mutateAsync } = useMutation(indexConcept);
  return (
    <Formik
      initialValues={{
        id: generateUid(),
        name: "",
        type: "",
        shortName: "",
        description: "",
      }}
      validationSchema={TerminologySchema}
      onSubmit={async (values, actions) => {
        const response = await mutateAsync({
          ...values,
          mappings: [],
          index,
          idField: "id",
        });
        actions.setSubmitting(false);
        router.push(`/${index}/${values.id}`);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <SimpleGrid columns={1} gap="10px" w="60%" m="auto">
            {index === "attributes" && (
              <>
                <Field name="identifier">
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name}>
                      <Checkbox {...field}>Identifier</Checkbox>
                    </FormControl>
                  )}
                </Field>
                <Field name="type">
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name}>
                      <RadioGroup>
                        <Stack direction="row">
                          <Radio {...field} value="gender">
                            Gender
                          </Radio>
                          <Radio {...field} value="address">
                            Address
                          </Radio>
                          <Radio {...field} value="given">
                            Given Name
                          </Radio>
                          <Radio {...field} value="family">
                            Family Name
                          </Radio>
                          <Radio {...field} value="birthDate">
                            Birth Date
                          </Radio>
                          <Radio {...field} value="extension">
                            Extension
                          </Radio>
                          <Radio {...field} value="telecom">
                            Telecom
                          </Radio>
                          <Radio {...field} value="maritalStatus">
                            Marital Status
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
              </>
            )}
            <Field name="id">
              {({ field }) => (
                <FormControl isInvalid={errors.id && touched.id} isReadOnly>
                  <FormLabel htmlFor="id">ID</FormLabel>
                  <Input {...field} id="id" placeholder="ID" />
                  <FormErrorMessage>{errors.id}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="name">
              {({ field }) => (
                <FormControl isInvalid={errors.name && touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="shortName">
              {({ field }) => (
                <FormControl isInvalid={errors.shortName && touched.shortName}>
                  <FormLabel htmlFor="shortName">Short Name</FormLabel>
                  <Input {...field} id="shortName" placeholder="Short Name" />
                  <FormErrorMessage>{errors.shortName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="description">
              {({ field }) => (
                <FormControl
                  isInvalid={errors.description && touched.description}
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    {...field}
                    rows={2}
                    id="description"
                    placeholder="Description"
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Box mt={4}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </Box>
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};

export default TerminologyForm;
