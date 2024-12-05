import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAdmin(Component: React.ComponentType) {
  return function AdminComponent(props: React.ComponentProps<typeof Component>) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded && !user?.publicMetadata?.isAdmin) {
        router.replace('/not-authorized');
      }
    }, [isLoaded, user, router]);

    if (!isLoaded || !user?.publicMetadata?.isAdmin) {
      return null; // Optional: Add a loader here
    }

    return <Component {...props} />;
  };
}
