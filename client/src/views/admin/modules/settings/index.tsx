import { useState } from "react";
import Tabs from "@/components/Tabs";
import AccountTab from "./containers/Tabs/AccountTab";
import ThemeTab from "./containers/Tabs/ThemeTab";
import Layout from "@/views/layout";

const tabLists = [
  { title: "Account", content: <AccountTab /> },
  { title: "Theme", content: <ThemeTab /> },
];

const SettingsScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Layout.Static>
      <section className="w-full mx-auto p-8 max-w-[1240px]">
        <h1 className="text-3xl font-bold">Personal Settings</h1>
        <Tabs className="my-4">
          <Tabs.Header className="mb-4 border-b border-gray-400 w-full flex gap-4">
            {tabLists.map(({ title }, index) => (
              <Tabs.Item
                key={title}
                currentID={index}
                title={title}
                active={selectedTab === index}
                onClick={() => setSelectedTab(index)}
                className="min-w-[75px] font-bold pb-2"
              />
            ))}
          </Tabs.Header>

          <Tabs.Main>
            {tabLists.map((items, index) => (
              <Tabs.Item.Content
                key={items.title}
                active={selectedTab === index}>
                {items.content}
              </Tabs.Item.Content>
            ))}
          </Tabs.Main>
        </Tabs>
      </section>
    </Layout.Static>
  );
};

export default SettingsScreen;
