import {
  Button,
  Frame,
  Layout,
  Modal,
  Page,
  TextField,
  Toast,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { Resend } from "resend";

type CreateCampaingsFormProps = {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const action: ActionFunction = async ({ request }) => {
  const resend = new Resend("re_ZZSKvgtW_CtNCFU4FZSTH6RirqTDM1ZnN");

  const formData = await request.formData();
  const to = formData.get("to") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;

  if (!to || !subject || !content) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const { data, error } = await resend.emails.send({
    from: "REMIX <onboarding@resend.dev>",
    to,
    subject,
    html: `<p>${content}</p>`,
  });

  return error
    ? new Response(JSON.stringify({ error }), { status: 500 })
    : new Response(JSON.stringify({ data }), { status: 200 });
};

const CreateCampaingsForm: React.FC<CreateCampaingsFormProps> = ({
  activate,
  setActivate,
}) => {
  const [formData, setFormData] = useState({
    campaignName: "",
    to: "",
    corporation: "",
    from: "",
    subject: "",
    content: "",
  });

  const [toastMassage, setToastMassage] = useState<string | null>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        setToastMassage("Error sending email!");
      } else {
        setToastMassage("Email sent successfully!");
        // setActivate(false);
      }
    }
  }, [actionData, setActivate]);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const activator = (
    <Button onClick={() => setActivate(!activate)}>Open</Button>
  );

  return (
    <Page>
      <Frame>
        {toastMassage && (
          <Toast
            content={toastMassage}
            onDismiss={() => setToastMassage(null)}
          />
        )}
        <Modal
          activator={activator}
          open={activate}
          onClose={() => setActivate(false)}
          title="Create new Email Campaign"
          primaryAction={{ content: "Send", onAction: () => {} }}
          secondaryActions={[{ content: "Finish later", onAction: () => {} }]}
        >
          <Modal.Section>
            <Form method="post" action="/app/createcampaingsform">
              <Layout>
                <Layout.Section>
                  <TextField
                    label="Campaign Name"
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleChange("campaignName")}
                    autoComplete="off"
                  />
                  <TextField
                    label="To"
                    name="to"
                    value={formData.to}
                    onChange={handleChange("to")}
                    autoComplete="off"
                  />
                  <TextField
                    label="Corporation"
                    name="corporation"
                    value={formData.corporation}
                    onChange={handleChange("corporation")}
                    autoComplete="off"
                  />
                  <TextField
                    label="From"
                    name="from"
                    value={formData.from}
                    onChange={handleChange("from")}
                    autoComplete="off"
                  />
                  <TextField
                    label="Email Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange("subject")}
                    autoComplete="off"
                  />
                  <TextField
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange("content")}
                    autoComplete="off"
                  />
                  <Button submit>Send</Button>
                </Layout.Section>
              </Layout>
            </Form>
            {actionData && (
              <p style={{ color: actionData.error ? "red" : "green" }}>
                {actionData.error || "Email sent successfully!"}
              </p>
            )}
          </Modal.Section>
        </Modal>
      </Frame>
    </Page>
  );
};

export default CreateCampaingsForm;
