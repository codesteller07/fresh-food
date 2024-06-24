import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Toolbar,
} from "@mui/material";

export default function AboutUs() {
  return (
    <Container>
      <Toolbar />

      <Card
        sx={{
          position: "relative",
          marginTop: 4,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          className="bgImage"
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "#fbd020" }}
          >
            We Believe in Good
          </Typography>
          <Typography variant="h6" component="p">
            When we say good, we don’t just mean good food. We also mean the
            goodness that good food leads to. Good memories, a good temper, a
            good day, a good burp. And we know that when our food leaves our
            kitchens, we’re creating all that. It’s rewarding, this belief in
            good. Now take a look at how we go about it.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
