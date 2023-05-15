import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover And Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptPortal is an open-source AI Prompt Tool for modern world to
        discover,create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}
