import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
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

  const truncatedText = post.prompt.substring(0, 500);
  const displayText = showFullText ? post.prompt : truncatedText;
  const isTextTruncated = post.prompt.length > 500;

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.userName}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
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
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {displayText}
        {isTextTruncated && (
          <button
            className="text-blue-500 font-inter text-sm underline ml-1"
            onClick={toggleShowFullText}
          >
            {showFullText ? "Show less" : "Show all"}
          </button>
        )}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id &&
        (usePathname() === "/profile" || usePathname() === "/profile/[id]") && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
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
