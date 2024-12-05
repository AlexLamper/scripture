import { redirect } from "next/navigation";

const HomeRedirect = () => {
    redirect("/");
    return null;
};

export default HomeRedirect;