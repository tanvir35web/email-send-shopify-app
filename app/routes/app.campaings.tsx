import {
  Button,
  InlineGrid,
  Layout,
  LegacyCard,
  Page,
  Tabs,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { tabs } from ".././utils/tabs";
import CreateCampaingsForm from "./app.createCampaingsForm";

type Props = {};

const Campaings = (props: Props) => {
  const [selected, setSelected] = useState(0);
  const [activate, setActivate] = useState(false);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <InlineGrid columns={2}>
            <Text variant="heading3xl" as="h2">
              Campaings
            </Text>
            <Button>Create new</Button>
          </InlineGrid>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard.Section title={tabs[selected].content}>
                {tabs[selected].component}
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </Layout.Section>

        <Layout.Section>
          <CreateCampaingsForm activate={activate} setActivate={setActivate} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Campaings;
