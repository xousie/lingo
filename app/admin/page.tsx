import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AppClientWrapper from "./app-client-wrapper";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AppClientWrapper />;
};

export default AdminPage;
