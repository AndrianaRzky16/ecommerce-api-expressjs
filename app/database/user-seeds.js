import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/seed", async (req, res) => {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: "admin@gmail.com",
          password: "password1",
          name: "Administrator",
          roleId: 1,
        },
        {
          email: "andrianarizki@gmail.com",
          password: "password2",
          name: "Andriana rizki",
          roleId: 2,
        },
        {
          email: "customer@gmail.com",
          password: "password3",
          name: "Customer",
          roleId: 2,
        },
      ],
    });

    res.send("User seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
    res.status(500).send("Error seeding users");
  }
});

