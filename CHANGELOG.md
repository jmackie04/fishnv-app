# Changelog

All notable changes to this project will be documented in this file. Each tagged release is a new deployment to production.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.0] - 2022-04-22

### Added

* Plausible analytics

## [2.1.0] - 2022-03-16

### Added

* Public lands map layer to the layer switcher panel.

### Changed

* All vector tile layers are served statically.

## [2.0.2] - 2022-01-19

### Changed

* Logo. Increased the size of the mountains to fill the whitespace.

### Fixed

* (Issue #2)[https://github.com/WildlifeNV/fishnv-app/issues/2] Map layer slider was showing up under the sidebar. This only happened in chrome. Fixed by removing the z-index from the sidebar.
* Attempting to fix the color of the waters on `waters/:id` page. The water specified in the route params should be orange. It works in dev. Tried a callback in `nextTick()` to run the style update.

## [2.0.1] - 2022-01-18

### Changed

* `/dev` route is only use in dev mode.

### Fixed

* Network call to `localhost` was used to fetch `/waters/:id`. Added `||` to replace from .env vars.

## [2.0.0] - 2022-01-18

This is the initial release of v2 of the FishNV Application. It is a complete rewrite with using some ideas and methods I've learned when building the HuntNV Application.