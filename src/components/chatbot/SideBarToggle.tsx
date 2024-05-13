import { TbAlignJustified } from "react-icons/tb";

const SidebarToggle = ({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean, toggleSidebar: () => void }) => {
    return (
        <button
            className="block md:hidden"
            onClick={toggleSidebar}
        >
            <TbAlignJustified />
        </button>
    );
};

export default SidebarToggle;