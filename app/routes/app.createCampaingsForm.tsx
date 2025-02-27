import {
  Button,
  Frame,
  Layout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

type CreateCampaingsFormProps = {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const action: ActionFunction = async ({ request }) => {};

const CreateCampaingsForm: React.FC<CreateCampaingsFormProps> = ({
  activate,
  setActivate,
}) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback(() => setActivate(!activate), [activate]);
  const handleChangeText = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const activator = <Button onClick={handleChange}>Open</Button>;

  const submit = useSubmit();
  const actionData = useActionData<typeof action>();

  console.log("ActionData : ", actionData);

  const sendEmail = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <Frame>
        <Modal
          activator={activator}
          open={activate}
          onClose={handleChange}
          title="Create new Email campaing"
          primaryAction={{
            content: "Send",
            onAction: sendEmail,
          }}
          secondaryActions={[
            {
              content: "Finish later",
              onAction: () => {},
            },
          ]}
        >
          <Modal.Section>
            <Form>
              <Layout>
                <Layout.Section>
                  <TextField
                    label="Campaing Name"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <TextField
                    label="To"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <TextField
                    label="Corporation"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <TextField
                    label="Form"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <TextField
                    label="Email Subject"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <TextField
                    label="Content"
                    value={value}
                    onChange={handleChangeText}
                    autoComplete="off"
                  />
                  <Button submit>Send</Button>
                </Layout.Section>
              </Layout>
            </Form>
          </Modal.Section>
        </Modal>
      </Frame>
    </Page>
  );
};

export default CreateCampaingsForm;
