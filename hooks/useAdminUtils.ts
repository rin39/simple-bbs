import { useRouter } from "next/router";
import { deleteThread } from "../lib/adminUtils";

export default function useAdminUtils() {
  const router = useRouter();
  return {
    deleteThread: async (threadId: string) => {
      await deleteThread(threadId);
      router.back();
    },
  };
}
