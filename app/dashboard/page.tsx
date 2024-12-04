import { auth } from "@/auth";

import LogoutButton from "@/features/auth/components/logout-button";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      Dashboard Page {JSON.stringify(session)} <LogoutButton />
    </div>
  );
};

export default DashboardPage;
