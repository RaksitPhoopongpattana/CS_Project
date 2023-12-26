import React, { useState } from "react";
import { Paper, Title, Container, Button, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";


import "./home.css"; // Import the CSS file

function Home() {
  const navigate = useNavigate();
  const [plant, setPlant] = useState<string | null>(null);

  const handleSubmit = () => {
    if (plant) {
      navigate(`/Dashboard?plant=${plant}`);
    } else {
      // Provide user feedback here, e.g., show an error message.
    }
  };

  return (
    <div className="app-container">
      <div className="centered-content">
        <Container size={420}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome Farmer!
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Select
              value={plant}
              onChange={(value) => setPlant(value)}
              placeholder="Pick your plant"
              data={[
                { value: "ผักกาดแก้ว", label: "ผักกาดแก้ว" },
                { value: "ผักคอส", label: "ผักคอส" },
              ]}
            />
            <Button onClick={handleSubmit} fullWidth mt="xl" disabled={!plant}>
              Submit
            </Button>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Home;
