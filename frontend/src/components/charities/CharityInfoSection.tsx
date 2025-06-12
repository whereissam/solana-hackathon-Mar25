import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { Charity } from "@/app/hubs/[id]/page"; // Import the Charity interface

interface CharityInfoSectionProps {
  charity: Charity;
}

const CharityInfoSection: React.FC<CharityInfoSectionProps> = ({ charity }) => {
  return (
    <>
      <CardMedia
        component="img"
        height="300"
        image={
          `https://lon1.digitaloceanspaces.com/ug-hackathon/charityImage/${charity.id}` ||
          `https://therecordnewspaper.org/wp-content/uploads/2019/05/Catholic-Charities-Building-Southwest-5-16-19-p1-.gif`
        }
        alt={charity.name}
        sx={{ borderRadius: 2, mb: 2 }}
      />

      <Typography variant="body1" sx={{ mb: 3 }}>
        {charity.description ||
          "This charitable organization is dedicated to making a positive impact in our community. Through various programs and initiatives, we strive to address pressing social issues and create lasting change."}
      </Typography>

      {/* Address information */}
      {charity.address && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "medium" }}>
            Location
          </Typography>
          <Typography variant="body1">
            {charity.address.postcode &&
              `Postcode: ${charity.address.postcode}`}
            {charity.address.city && `, ${charity.address.city}`}
            {charity.address.country && `, ${charity.address.country}`}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CharityInfoSection;
