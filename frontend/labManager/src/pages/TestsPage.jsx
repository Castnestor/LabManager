import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import List from "../components/List";
import { Box } from "@mui/material";
import ModalInput from "../components/ModalInput";
import { useTheme } from "@emotion/react";
import { tokens } from "../themes/theme";

export default function TestsPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("api/tests");
        console.log(response.data.data);
        setTests(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);

  tests.length > 0 && console.log("Length true");

  return (
    <div>
      <Header title="Tests" subtitle="Your current tests" />
      {tests.length > 0 && (
        <List
          data={tests}
          url="/api/tests"
          options={[true, false]}
          deleteRow={true}
        />
      )}
      <ModalInput
        backgroundColor={colors.greenAccent[300]}
        fontcolor={colors.greenAccent[900]}
        inputType={"test"}
        buttonName={"ADD TEST"}
      />
    </div>
  );
}
