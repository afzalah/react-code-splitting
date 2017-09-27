import * as prunk from "prunk";
import * as settings from "./settings-common";

prunk.mock("settings", settings);
prunk.suppress(/\.(css|less)/);
