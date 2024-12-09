# Project Documentation

## Overview
This project is a comprehensive web application designed to facilitate the exploration of fisheries biology and angling. It includes features such as lake finding, species searches, and taxonomic tree exploration. The application leverages a modular React architecture with dynamic components, data fetching APIs, and rich user interface elements.

---

## Project Structure

- [`package-lock.json`](/WebClient/package-lock.json): Dependency lock file for consistent installations.
- [`package.json`](/WebClient/package.json): Contains project metadata and dependencies.


### [`Public`](/WebClient/public/) Directory
Contains static assets accessible by the client browser.
- [`assets/images`](/WebClient/public/assets/images/): SVG illustrations for various species (e.g., *Acipenser fulvescens*, *Alosa chrysochloris*).
- [`favicon.ico`](/WebClient/public/favicon.ico): Application icon.
- [`index.html`](/WebClient/public/index.html): Main HTML template.
- [`manifest.json`](/WebClient/public/manifest.json): PWA configuration.



### [`SRC`](/WebClient/src/) Directory
The main source code of the application is organized as follows:

- [`App.js`](/WebClient/src/App.js): Entry point for the React application, responsible for rendering the root component.

- [`api.js`](/WebClient/src/api.js): Utility file containing functions to fetch data from APIs.
- [`theme.js`](/WebClient/src/theme.js): Contains Material-UI theme definitions for consistent styling.
- [`index.js`](/WebClient/src/index.js): Entry point for ReactDOM rendering.


#### [`Components`](/WebClient/src/components/) Directory
Houses reusable components for modular design.

- [`Navbar.js`](/WebClient/src/components/Navbar.js): Implements the navigation bar for app-wide routing.
- [`taxTree.js`](/WebClient/src/components/taxTree.js)
  Component for rendering taxonomic trees.

- [`LakeFinder/`](/WebClient/src/components/LakeFinder/)
  - [`SearchPanel.js`](/WebClient/src/components/LakeFinder/SearchPanel.js): Input panel for searching lakes.
  - [`SurveyDataCard.js`](/WebClient/src/components/LakeFinder/SurveyDataCard.js): Displays summarized survey data for a lake.

- [`SpeciesFinder/`](/WebClient/src/components/SpeciesFinder/)
  - [`SpeciesSearch.js`](/WebClient/src/components/SpeciesFinder/SpeciesSearch.js): Autocomplete search for species names.

- [`SpeciesProfile/`](/WebClient/src/components/SpeciesProfile/)
  - [`ClassificationCard.js`](/WebClient/src/components/SpeciesProfile/ClassificationCard.js): Displays taxonomic classification details.
  - [`CollapsibleRow.js`](/WebClient/src/components/SpeciesProfile/CollapsibleRow.js): Expandable row for detailed data.
  - [`HeaderImage.js`](/WebClient/src/components/SpeciesProfile/HeaderImage.js): Displays a species header image.
  - [`LengthDistributionChart.js`](/WebClient/src/components/SpeciesProfile/LengthDistributionChart.js): Visualizes species length distribution.
  - [`PopulationCarousel.js`](/WebClient/src/components/SpeciesProfile/PopulationCarousel.js): Carousel for population data images.
  - [`PopulationTable.js`](/WebClient/src/components/SpeciesProfile/PopulationTable.js): Tabular representation of population data.

- [`WaterbodyProfile/`](/WebClient/src/components/WaterbodyProfile/)
  - [`LakeDetailsCard.js`](/WebClient/src/components/WaterbodyProfile/LakeDetailsCard.js): Shows details of a specific waterbody.
  - [`MapCard.js`](/WebClient/src/components/WaterbodyProfile/MapCard.js): Interactive map visualization of the waterbody.

#### [`Pages`](/WebClient/src/pages/) Directory
Defines routes and high-level pages for the application.

- [`Home.js`](/WebClient/src/pages/Home.js): The landing page.
- [`LakeFinder.js`](/WebClient/src/pages/LakeFinder.js): Page for searching and viewing lakes.
- [`ListofSpecies.js`](/WebClient/src/pages/ListofSpecies.js): Lists all species with links to their profiles.
- [`SpeciesFinder.js`](/WebClient/src/pages/SpeciesFinder.js): Search and explore species.
- [`SpeciesProfile.js`](/WebClient/src/pages/SpeciesProfile.js): Displays detailed species information.
- [`TaxaProfile.js`](/WebClient/src/pages/TaxaProfile.js): Profiles for specific taxonomic groups.
- [`WaterbodyProfile.js`](/WebClient/src/pages/WaterbodyProfile.js): Detailed view of a selected lake or waterbody.
- [`taxonomySearch.js`](/WebClient/src/pages/taxonomySearch.js): Search page for taxonomy data.

