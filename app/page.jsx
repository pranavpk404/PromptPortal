import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="mt-5 text-center text-5xl font-extrabold leading-[1.15] text-black dark:text-gray-200 sm:text-6xl">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient  text-center">
          {" "}
          AI-Powered Prompts
        </span>
      </h1>
      <p className="max-w-2xl; mt-5 text-center text-lg text-gray-600 dark:text-gray-400 sm:text-xl ">
        Powered by AI, Embraced by AI
      </p>
      <Feed />
    </section>
  );
};

export default Home;
