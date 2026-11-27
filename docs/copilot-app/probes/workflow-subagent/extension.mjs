import { defineWorkflow, joinSession } from "@microsoft/copilot-sdk/extension";
import { createProbe } from "./probe.mjs";

let session;
const { workflow, tools } = createProbe(defineWorkflow, () => session);
session = await joinSession({ workflows: [workflow], tools });
