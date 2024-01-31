import Link from "next/link";

const navItems = [
  { name: "Create", path: "/create" },
  { name: "Run", path: "/run" },
  { name: "Chatbot", path: "/chatbot" },
];

export const LeftNavbar = () => {
  return (
    <div className="  w-56 bg-[#F8F9FB] text-white  h-screen fixed ">
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="flex  text-[#212B36] p-4 hover:bg-[#EFF1F4] cursor-pointer"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
