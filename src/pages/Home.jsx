import Accordion, { AccordionItem } from "@/components/Accordion";
import { Tabs, Tab } from "@/components/Tabs";
import useUser from "@/hooks/userUser";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import { TextInput } from "@/components/Form";
import loginSchema from "@/schema/loginSchema";

function Home() {
  const [search, setSearch] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = useUser();
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h1>Xin chào {user?.firstName || ""}</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <form>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Avatar preview" />}
      </form>
      <Tabs
        defaultIndex={0}
        onChange={(currentIndex) => console.log(currentIndex)}
      >
        <Tab title="Tab 1" onClick={() => console.log("CLicked !!!")}>
          Content Tab 1
        </Tab>
        <Tab title="Tab 2" onClick={() => console.log("CLicked !!!")}>
          Content Tab 2
        </Tab>
        <Tab title="Tab 3" onClick={() => console.log("CLicked !!!")}>
          Content Tab 3
        </Tab>
        <Tab title="Tab 4" onClick={() => console.log("CLicked !!!")}>
          Content Tab 4
        </Tab>
      </Tabs>
      <hr />
      <div>
        <Accordion
          defaultIndex={0}
          onChange={(index) => console.log(index)}
          collapseOther={false}
        >
          <AccordionItem header="Accordion 1">
            Nội dung của Accordion 1
          </AccordionItem>
          <AccordionItem header="Accordion 2">
            Nội dung của Accordion 2
          </AccordionItem>
          <AccordionItem header="Accordion 3">
            Nội dung của Accordion 3
          </AccordionItem>
        </Accordion>
      </div>
      <Form onSubmit={(data) => console.log(data)} schema={loginSchema}>
        <TextInput name="email" type="email" placeholder="email" />
        <TextInput name="password" type="password" placeholder="password" />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}

export default Home;
