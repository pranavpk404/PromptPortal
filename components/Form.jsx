import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="text-left  text-2xl">
        <span className="orange_gradient">{type} Post</span>
      </h1>
      <p className="max-w-2xl; mt-5  max-w-md text-left text-lg text-gray-600  dark:text-gray-400 sm:text-xl">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="my-10 flex w-full max-w-2xl flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 p-10 dark:bg-gray-950"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-50">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea dark:text-gray-50s dark:bg-gray-950"
          />
        </label>

        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-50">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input dark:text-gray-50s dark:bg-gray-950"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-green-700 px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `Please Wait.` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
