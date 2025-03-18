// src/components/home/TeamCard.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  IconButton,
  Typography,
} from "@mui/material";
import EmailIcon from "@/components/icons/EmailIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
  email?: string;
  linkedin?: string;
}

const TeamCard: React.FC<TeamMember> = ({
  image,
  name,
  position,
  email,
  linkedin,
}) => {
  return (
    <Card sx={{ width: "267px" }}>
      <CardMedia sx={{ height: 230 }} title={name} image={image} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{position}</Typography>
      </CardContent>
      {(email || linkedin) && (
        <CardActionArea sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
          {email && (
            <IconButton href={`mailto:${email}`} aria-label="Email">
              <EmailIcon />
            </IconButton>
          )}
          {linkedin && (
            <IconButton
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          )}
        </CardActionArea>
      )}
    </Card>
  );
};

export default TeamCard;
