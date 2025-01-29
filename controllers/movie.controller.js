const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");

const findAllMovies = (status) => {
  if (status == null || status == "") {
    return Movie.find();
  } else {
    return status == "PUBLISHED"
      ? Movie.find({ published: true })
      : status == "RELEASED"
      ? Movie.find({ released: true })
      : [];
  }
};

const findOne = (id) => {
  return Movie.findOne({ movieid: id });
};

const findShows = async (id) => {
  const shows = await Movie.findOne({ movieid: id }, { shows: 1, _id: 0 });
  return shows.shows;
};

module.exports = { findAllMovies, findOne, findShows };
