/*jshint esversion: 6 */
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forcast = require("./utilis/forcast.js");

// Define express path config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

// setting up handbars engine and view function
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setting up static files
app.use(express.static(publicDirectoryPath));

// setting up views and route handler

app.get("", (req, res) => {
  res.render("index", {
    title: "Adedayo Weather Application",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please Provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(
        location,
        (error, { temperature, icon, description, country, feelslike }) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            temperature,
            icon,
            country,
            description,
            feelslike,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/api", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "plese input an addres",
    });
  }
  geocode(req.query.address, (error, { location }) => {
    if (error) {
      return res.send({ error });
    }
    forcast(
      location,
      (error, { temperature, icon, description, country, feelslike }) => {
        if (error) {
          return res, send({ error });
        }
        res.send({
          temperature,
          icon,
          country,
          description,
          feelslike,
          address: req.query.address,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.country) {
    return res.send({
      Error: "You must provide a search term",
    });
  }
  console.log(req.query.games);
  res.send({
    products: "name",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port #3000");
});
