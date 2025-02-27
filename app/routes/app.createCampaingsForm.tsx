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
import { Resend } from "resend";

type CreateCampaingsFormProps = {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
};
const resend = new Resend("");

export const action: ActionFunction = async ({ request }) => {
  console.log("Hit the action...");
  const { data, error } = await resend.emails.send({
    from: "REMIX <onboarding@resend.dev>",
    to: "tanvir.niter09@gmail.com",
    subject: "Hello World from Shopify App (Email Sender)",
    html: "<p>Congrats on sending your <strong>First email</strong>!</p>",
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  console.log("Email sent: ", data);
  return new Response(JSON.stringify({ data }), { status: 200 });
};

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

  const sendEmails = () => submit({}, { replace: true, method: "POST" });

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
            onAction: sendEmails,
          }}
          secondaryActions={[
            {
              content: "Finish later",
              onAction: () => {},
            },
          ]}
        >
          <Modal.Section>
            <Form onSubmit={sendEmails} action="/app/createcampaingsform" method="post">
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
