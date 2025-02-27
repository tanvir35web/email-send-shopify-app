import { Html } from "@react-email/components";
import { Button } from "@shopify/polaris";

export function newEmail(props: { url: string }) {
  
  const { url } = props;

  return (
    <Html>
      <Button url={url}>Click Me</Button>
    </Html>
  );
}
