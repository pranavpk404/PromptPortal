import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ handleTagClick, handleEdit, handleDelete, post }) => {
  const [copied, setCopied] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    if (session?.user.id === post.creator._id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = post.prompt.substring(0, 600);
  const displayText = showFullText ? post.prompt : truncatedText;
  const isTextTruncated = post.prompt.length > 500;
  return (
    <div className="h-fit; break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter dark:border-slate-700 dark:bg-slate-700 md:w-[550px]">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
          <Image
            src={
              post.creator.images
                ? post.creator.images
                : "/assets/images/logo.svg"
            }
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 dark:text-gray-50">
              {post.creator.username ? post.creator.username : "Loading"}
            </h3>
            <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
              {post.creator.email ? post.creator.email : "Loading"}
            </p>
          </div>
        </div>

        <div
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10  backdrop-blur dark:bg-black/30"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy_icon"
            className="cursor-pointer duration-300 ease-in-out"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-gray-300">
        {displayText ? displayText : "Loading"}
        {isTextTruncated && (
          <button
            className="ml-1 font-inter text-sm text-blue-500 underline"
            onClick={toggleShowFullText}
          >
            {showFullText ? "Show less" : "Show all"}
          </button>
        )}
      </p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag ? post.tag : "Loading"}
      </p>
      {session?.user.id === post.creator._id &&
        (usePathname() === "/profile" || usePathname() === "/profile/[id]") && (
          <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3 dark:border-gray-800">
            <p
              className="green_gradient cursor-pointer font-inter text-sm"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="orange_gradient cursor-pointer font-inter text-sm"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
