import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Loading } from "..";
import {
  admin1Icon,
  ecommerceIcon,
  inventoryIcon,
  marketplaceIcon,
  monitoringIcon,
  order1Icon,
  profileIcon,
  projection1Icon,
} from "../../assets/Dashboard";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { Privilege } from "../../luntian-types";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../utils/framer-constants";

interface DashItemProps {
  title: string;
  link: string;
  icon: string;
}

const DashItem: React.FC<DashItemProps> = ({ title, link, icon }) => {
  return (
    <motion.div variants={fadeInUp}>
      <Link to={link}>
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-full shadow w-36 h-36 active:bg-gray-50 hover:shadow-md md:h-52 md:w-52">
          <img
            src={icon}
            alt={`${title}Icon`}
            className="w-12 h-12 md:w-20 md:h-20"
          />
          <p className="mt-2 text-xs text-gray-700 md:text-base">{title}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const HomeDashboard: React.FC = () => {
  const { userData } = useContext(FirestoreContext);

  if (!userData?.privilege) return <Loading />;

  const isAdmin =
    (userData.privilege as Privilege) === "FARMER" ||
    (userData.privilege as Privilege) === "ADMIN";

  const userRoutes: DashItemProps[] = [
    {
      title: "Profile",
      link: `/home/profile/${userData.id}`,
      icon: profileIcon,
    },
    { title: "Marketplace", link: "/home/marketplace", icon: marketplaceIcon },
  ];

  const adminRoutes: DashItemProps[] = [
    { title: "Inventory", link: "/admin/inventory", icon: inventoryIcon },
    { title: "Orders", link: "/admin/orders", icon: order1Icon },
    { title: "E-Commerce", link: "/admin/sales", icon: ecommerceIcon },
    { title: "Projections", link: "/admin/projections", icon: projection1Icon },
    {
      title: "Farm Monitoring",
      link: "/monitoring?tab=monitoring",
      icon: monitoringIcon,
    },
    { title: "Admin Controls", link: "/admin", icon: admin1Icon },
  ];

  return (
    <div className="flex items-center justify-center w-full px-4 py-10">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
        className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-3"
      >
        {userRoutes.map((route) => (
          <DashItem {...route} />
        ))}

        {isAdmin && adminRoutes.map((route) => <DashItem {...route} />)}
      </motion.div>
    </div>
  );
};

export default HomeDashboard;
