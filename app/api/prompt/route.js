import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export const SEARCH = async (request) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
