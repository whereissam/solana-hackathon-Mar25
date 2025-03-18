// src/components/home/TeamSection.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import TeamCard from "@/components/home/TeamCard";
import { sectionStyle } from "@/styles/common";

interface TeamMember {
  name: string;
  position: string;
  description: string;
  email?: string;
  linkedin?: string;
}

const TeamSection: React.FC = () => {
  const teamData: TeamMember[] = [
    {
      name: "Matt",
      position: "Founder & CEO",
      description: "Favorite Dog Breed",
    },
    {
      name: "Sharon",
      position: "Founder & Global Business Development",
      description: "Favorite Dog Breed",
    },
    {
      name: "Rob",
      position: "Product Manager & Tech Lead",
      description: "Favorite Dog Breed",
    },
    {
      name: "Lawson",
      position: "Chief Architect",
      description: "Favorite Dog Breed",
    },
    {
      name: "Freeboid",
      position: "XR Producer & Multidisciplinary artist",
      description: "Favorite Dog Breed",
    },
    {
      name: "Ankit",
      position: "Blockchain Specialist",
      description: "Favorite Dog Breed",
    },
    {
      name: "Daniel",
      position: "Backend Developer",
      description: "Favorite Dog Breed",
    },
    {
      name: "Andy",
      position: "Frontend Developer",
      description: "Favorite Dog Breed",
    },
    {
      name: "Faiz",
      position: "Creative Direction & UI",
      description: "Favorite Dog Breed",
    },
  ];

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h6">Who we are</Typography>
      <Typography variant="h3">Meet Our Team</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 0.9,
          justifyContent: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {teamData.map((member, index) => (
          <TeamCard
            key={index}
            image={`/img/team/team_${index}.png`}
            name={member.name}
            position={member.position}
            description={member.description}
            email={member.email}
            linkedin={member.linkedin}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TeamSection;
