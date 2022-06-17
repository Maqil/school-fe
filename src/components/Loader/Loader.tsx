import React from "react";
import { Box } from "@mui/material";
import { LoaderContent } from "./Loader.style";
import spinner from "../../assets/images/spinner.svg";

function Loader() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LoaderContent>
        <img src={spinner} alt="loading" />
      </LoaderContent>
    </Box>
  );
}

export default Loader;
