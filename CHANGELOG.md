# Changelog

All notable changes to this project will be documented in this file. Each tagged release is a new deployment to production.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2022-01-18

## Changed

* `/dev` route is only use in dev mode.

## Fixed

* Network call to `localhost` was used to fetch `/waters/:id`. Added `||` to replace from .env vars.

## [2.0.0] - 2022-01-18

This is the initial release of v2 of the FishNV Application. It is a complete rewrite with using some ideas and methods I've learned when building the HuntNV Application.