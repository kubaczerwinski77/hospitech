import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Schedule from "./components/schedule/Schedule";
import { BASE_URL, PREFIX } from "./config";

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}${PREFIX}/courses`);
    const data = await response.json();
    setData(data);
  };

  return (
    <>
      <NavigationBar />
      <Schedule />
      {/* <Box>
        <Button onClick={() => fetchData()}>API</Button>
        {data ? <Text>{data}</Text> : <Text>No data</Text>}
      </Box> */}
    </>
  );
}

export default App;
